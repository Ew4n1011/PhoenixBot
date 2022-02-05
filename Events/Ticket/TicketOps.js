const {ButtonInteraction, MessageEmbed} = require('discord.js')
const {createTranscript} = require('discord-html-transcripts')
const DB = require('../../Structures/Schemas/Ticket')
const TicketSetupData = require('../../Structures/Schemas/ticketSetup')

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return
        const {guild, customId, channel, member} = interaction
        if(!["close", "claim"].includes(customId)) return

        const TicketSetup = await TicketSetupData.findOne({GuildID: guild.id})
        if(!TicketSetup) return interaction.reply({content: "The data for this system is outdated."})

        const Embed = new MessageEmbed().setColor("BLUE")

        DB.findOne({ChannelID: channel.id}, async (err, docs) => {
            if (err) throw err
            if (!docs)
                return interaction.reply({content: "No data was found related to this ticket, please delete manually.", ephemeral: true})
            switch(customId) {
                case "close" :
                if(docs.Closed == true)
                return interaction.reply({content: "Ticket is already closed, please wait for it to get deleted", ephemeral: true})
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`
                })
                await DB.updateOne({ChannelID: channel.id}, {Closed: true})

                const Message = await guild.channels.cache
            .get(TicketSetup.Transcripts)
            .send({
              embeds: [
                Embed.setTitle(`Ticket Closed`).addFields([
                  {
                    name: "Ticket ID",
                    value: `${docs.TicketID}`,
                    inline: true,
                  },
                  {
                    name: "Type",
                    value: `${docs.Type}`,
                    inline: true,
                  },
                  {
                    name: "Opened By",
                    value: `<@!${docs.MembersID[0]}>`,
                    inline: true,
                  },
                  {
                    name: "Open Time",
                    value: `<t:${docs.OpenTime}:R>`,
                    inline: true,
                  },
                  {
                    name: "Closed Time",
                    value: `<t:${parseInt(Date.now() / 1000)}:R>`,
                    inline: true,
                  },
                  {
                    name: "Closed By",
                    value: `<@!${docs.ClaimedBy}>`,
                    inline: true,
                  },
                ]),
              ],
              files: [attachment],
            });

                interaction.reply({embeds: [Embed.setDescription(`The transcript is now saved [TRANSCRIPT](${Message.url})`)]})

                setTimeout(() => {
                    channel.delete()
                }, 10 * 1000)
                break
                case "claim" :
                    if(docs.Claimed == true) 
                        return interaction.reply({content: `This ticket has already been claimed by <@${docs.ClaimedBy}>`, ephemeral: true
                    })
                
                    await DB.updateOne({ChannelID: channel.id}, {Claimed: true, ClaimedBy: member.id})

                    Embed.setDescription(`🛄 | This ticket is now claimed by ${member}`)
                    interaction.reply({embeds: [Embed]})
                break
            }
        })
    }
}
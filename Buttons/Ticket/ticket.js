const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const DB = require('../../Structures/Schemas/Ticket')
const TicketSetupData = require('../../Structures/Schemas/TicketSetup')

module.exports = {
    id: "ticket",
    async execute(interaction) {
        if(!interaction.isButton()) return
        const {guild, member, customId} = interaction

        const Data = await TicketSetupData.findOne({GuildID: guild.id})
        if(!Data) return

        if(!"ticket".includes(customId)) return

        const ID = Math.floor(Math.random() * 9000)

        await guild.channels.create(`${"ticket" + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: Data.Category,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: Data.Handlers,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: Data.Everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                }
            ]
        }).then(async(channel) => {
            await DB.create({
                GuildID: guild.id,
                MembersID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false
            })

            const Embed = new MessageEmbed().setAuthor({
                name: `${guild.name} | Ticket: ${ID}`,
                iconURL: guild.iconURL({dynamic: true}) 
            })
            .setColor("BLUE")
            .setDescription("Please wait patiently for a response from the Staff team, whilst waiting, describe your issue in as much detail as possible")
            .setFooter({text: "Patience is key."})
      
            channel.send({
                embeds: [Embed]
            })
    
            interaction.reply({content: `${member} your ticket has been created: ${channel}`, ephemeral: true})
        })
    }
}
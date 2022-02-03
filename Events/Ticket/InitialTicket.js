const {ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
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
        const {guild, member, customId} = interaction

        const Data = await TicketSetupData.findOne({GuildID: guild.id});
        if(!Data) return;

        if(!Data.Buttons.includes(customId)) return;

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: Data.Category,
            permissionOverwrites: [
            {
                id: member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
            {
                id: Data.Everyone,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            }]
        }).then(async(channel) => {
            await DB.create({
                GuildID: guild.id,
                MemberID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
                Claimed: false
            })

            const Embed = new MessageEmbed()
            .setAuthor({name: `${guild.name} | Ticket: ${ID}`, iconURL: `${guild.iconURL({dynamic: true})}`})
            .setDescription("Please wait patiently for a response from the Staff team, in the meanwhile, describe your issue in as much detail as possible.")
            .setFooter({text: "Patience is key."})
    
            const Buttons = new MessageActionRow()
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("close")
                .setLabel("Save & Close ticket")
                .setStyle("PRIMARY")
                .setEmoji("💾"),
                new MessageButton()
                .setCustomId("claim")
                .setLabel("Claim")
                .setStyle("PRIMARY")
                .setEmoji("🛄")
            )
    
            channel.send({
                embeds: [Embed],
                components: [Buttons]
            })
                        
            const TicketEmbed = new MessageEmbed().setColor("GREEN").setDescription(`✅ | Your ticket has been created: ${channel}`)

            interaction.reply({embeds: [TicketEmbed], ephemeral: true})
        })
    }
}
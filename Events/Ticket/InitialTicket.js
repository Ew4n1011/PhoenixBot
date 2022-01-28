const {ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const DB = require('../../Structures/Schemas/Ticket')
const config = require('../../Structures/config.json')

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return
        const {guild, member, customId} = interaction
        if(!["player", "bug", "other"].includes(customId)) return

        const ID = Math.floor(Math.random() * 90000) + 10000

        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: config.TicketCategoryId,
            permissionOverwrites: [
            {
                id: member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
            {
                id: config.everyoneId,
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
                .setCustomId("lock")
                .setLabel("Lock")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
                new MessageButton()
                .setCustomId("unlock")
                .setLabel("Unlock")
                .setStyle("SUCCESS")
                .setEmoji("🔓")
            )
    
            channel.send({
                embeds: [Embed],
                components: [Buttons]
            })
            await channel.send({content: `${member} here is your ticket`}).then((m) => {
                setTimeout(() => {
                    m.delete().catch(() => {})
                }, 1 * 5000)
            })
    
            interaction.reply({content: `${member} your ticket has been created: ${channel}`, ephemeral: true})
        })
    }
}
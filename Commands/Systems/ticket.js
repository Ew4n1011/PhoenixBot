const {MessageEmbed, CommandInteraction, MessageActionRow, MessageButton} = require('discord.js')
const config = require('../../Structures/config.json')

module.exports = {
    name: "ticket",
    description: "Setup your ticketing message.",
    permission: "ADMINISTRATOR",
    /** 
     * 
     * @param {CommandInteraction} interaction
    */
    async execute(interaction) {
        const {guild} = interaction
        
        const Embed = new MessageEmbed().setAuthor({
            name: `${guild.name} | Ticketing System`,
            iconURL: `${guild.iconURL({dynamic: true})}`
        })
        .setDescription("Open a ticket to discuss any of the issues listed on the button.")
        .setColor("#36393f")

        const Buttons = new MessageActionRow()
        Buttons.addComponents(
            new MessageButton()
            .setCustomId("player")
            .setLabel("Player Report")
            .setStyle("PRIMARY")
            .setEmoji("🟥"),
            new MessageButton()
            .setCustomId("bug")
            .setLabel("Bug Report")
            .setStyle("SECONDARY")
            .setEmoji("🐞"),
            new MessageButton()
            .setCustomId("other")
            .setLabel("Other Report")
            .setStyle("SUCCESS")
            .setEmoji("🎫")
        )

        await guild.channels.cache.get(config.openTicketId).send({embeds: [Embed], components: [Buttons]})

        interaction.reply({content: "Done", ephemeral: true})
    }
}
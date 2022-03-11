const {CommandInteraction, MessageEmbed} = require('discord.js')

module.exports = {
    name: "avatar",
    usage: "/avatar",
    description: "Displays user's avatar.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const Embed = new MessageEmbed().setColor("DARK_AQUA")
        .setTitle(`${interaction.user.tag}'s Avatar`)
        .setImage(`${interaction.user.displayAvatarURL()}`)
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})

        interaction.reply({embeds: [Embed]})
    }
}
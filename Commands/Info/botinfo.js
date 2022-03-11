const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name: "botinfo",
    usage: "/botinfo",
    description: "See the info of the bot.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const {guild} = interaction

        const {memberCount} = guild
        
        const Embed = new MessageEmbed().setColor("PURPLE")
        .setTitle(`Information about ${client.user.username}`)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: "Bot tag",
                value: `${client.user.tag}`
            },
            {
                name: "Version",
                value: "1.0"
            },
            {
                name: "Server count",
                value: `${client.guilds.cache.size}`
            },
            {
                name: "Total members",
                value: `${memberCount}`
            }
        )

        interaction.reply({embeds: [Embed]})
    }
}
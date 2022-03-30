const {ContextMenuInteraction, MessageEmbed} = require('discord.js')

module.exports = {
    name: "userinfo",
    type: "USER",
    /**
     * 
     * @param {ContextMenuInteraction} interaction
     */
    async execute (interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId)
        try {
            const Response = new MessageEmbed()
            .setColor("AQUA")
            .setAuthor({name: `${target.user.tag}`, iconURL: `${target.user.displayAvatarURL({dynamic: true, size: 512})}`})
            .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`ID: ${target.user.id}`)
            .addField("Roles", `${target.roles.cache.map(r => r).join("").replace("@everyone", "") || "None"}`)
            .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
            .addField("Discord User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)
    
            interaction.reply({embeds: [Response], ephemeral: true})
        } catch (err) {
            const ErrEmbed = new MessageEmbed().setColor("RED")
            .setDescription(`\`\`\`${err}\`\`\``)

            interaction.reply({embeds: [ErrEmbed], ephemeral: true})
        } 
    }
}
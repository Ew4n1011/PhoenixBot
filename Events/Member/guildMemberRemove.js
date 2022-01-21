const {MessageEmbed, WebhookClient, GuildMember} = require('discord.js')
const config = require('../../Structures/config.json')

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member
     */
    execute (member) {
        const {user, guild} = member

        const Welcomer = new WebhookClient({
            id: config.WelcomeWebhookID,
            token: config.WelcomeWebhookToken
        })

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true, size: 512})}`})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the server\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({text: `ID: ${user.id}`})

        Welcomer.send({embeds: [Welcome]})
    }
}
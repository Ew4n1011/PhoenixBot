const {MessageEmbed, WebhookClient, GuildMember} = require('discord.js')
const config = require('../../Structures/config.json')

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member
     */
    execute (member) {
        const {user, guild} = member

        member.roles.add(config.memberRoleID)

        const Welcomer = new WebhookClient({url: config.WelcomeMsgWebhookURL})

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({name: `${user.tag}`, iconURL: `${user.avatarURL({dynamic: true, size: 512})}`})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to **${guild.name}**!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({text: `ID: ${user.id}`})

        Welcomer.send({embeds: [Welcome]})
    }
}
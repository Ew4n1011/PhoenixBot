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

        const Welcomer = new WebhookClient({url: config.WelcomeMsgWebhookURL})

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor({name: `${user.tag}`, iconURL: `${user.avatarURL({dynamic: true, size: 512})}`})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the server\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({text: `ID: ${user.id}`})

        Welcomer.send({embeds: [Welcome]})
    }
}
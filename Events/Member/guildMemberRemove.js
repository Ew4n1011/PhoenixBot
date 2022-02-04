const { MessageEmbed, GuildMember } = require("discord.js");
const LeaveSetupData = require("../../Structures/Schemas/leaveSetup");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const { guild, user } = member;

        const Data = await LeaveSetupData.findOne({ GuildID: guild.id})
        if(!Data) return;

        const LeaveEmbed = new MessageEmbed()
        .setColor("RED")
        .setAuthor({
            name: user.tag,
            iconURL: user.displayAvatarURL({
                dynamic: true
            }),
        })
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setDescription(
        `${member} has left the server\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`
        )
        .setFooter({text: `ID: ${user.id}`})

        await guild.channels.cache
            .get(Data.Logs)
            .send({ embeds: [LeaveEmbed] });
    }
}
const { CommandInteraction, Client, MessageAttachment, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require('canvacord');

module.exports = {
    name: "rank",
    description: "Get the rank of a user.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Target = interaction.options.getUser("target") || interaction.member;
        const users = await Levels.fetch(Target.id, interaction.guildId);
        
        const Embed = new MessageEmbed().setColor("RED").setDescription("⛔ | The mentioned user has no xp.")
        if(!users) return interaction.reply({embeds: [Embed], ephemeral: true})

        const neededXp = Levels.xpFor(parseInt(users.level) + 1);

        const rank = new canvacord.Rank()
        .setAvatar(Target.displayAvatarURL({format: 'png', size: 512}))
        .setCurrentXP(users.xp) 
        .setRequiredXP(neededXp)
        .setStatus(Target.presence.status)
        .setLevel(users.level)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(Target.user.username)
        .setDiscriminator(Target.user.discriminator);
    
    rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        interaction.reply({files: [attachment]});
    });
    }
}
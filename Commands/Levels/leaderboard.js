const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
    name: "leaderboard",
    description: "Shows top 10 highest ranks in the server.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const LeaderBoard = await Levels.fetchLeaderboard(interaction.guild.id, 10); // gets top 10 members from a guild and puts them in the leaderboard

        const Embed = new MessageEmbed().setColor("RED").setDescription("⛔ | There aren't any users in the leaderboard.")
        if (LeaderBoard.length < 1) return interaction.reply({embeds: [Embed], ephemeral: true});

        const leaderboard = await Levels.computeLeaderboard(client, LeaderBoard, true);
        const lb = leaderboard.map(e => "```" + `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}` + "```"); 

        const response = new MessageEmbed()
        .setTitle("**LEADERBOARD**")
        .setDescription(`${lb.join("\n\n")}`)
        .setColor("DARK_PURPLE")

        interaction.reply({embeds: [response]})
    }
}

const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "meme",
    description: "Request a meme from reddit via subreddits.",
    options: [
        {
            name: "subreddit",
            description: "Provide a subreddit to fetch memes from.",
            type: "STRING",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const subreddit = interaction.options.getString("subreddit") || "";

        try {
            const response = await axios.get(`https://meme-api.herokuapp.com/gimme/${subreddit}`);

            if (response.data.nsfw && !interaction.channel.nsfw)
                return interaction.reply({content: "⛔ No **NSFW** content allowed in this channel ⛔\nGo to a channel where **NSFW** is *enabled*.", ephemeral: true});
            
            const meme  = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(response.data.title)
                .setImage(response.data.url)
                .setFooter({text:`Posted by ${response.data.author} in r/${response.data.subreddit} with ${response.data.ups} upvotes`})
                .setTimestamp();

            const reply = await interaction.reply({ embeds: [meme], fetchReply: true });
            reply.react("🟢");
            reply.react("🔴");
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setTitle("🔍 Unable to find subreddit 🔎")
                .setColor("RED")
                .setDescription(`The **${subreddit}** subreddit does not exist.`)
            interaction.reply({embeds: [errorEmbed], ephemeral: true});
        }
    }
}
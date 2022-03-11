const {CommandInteraction, MessageEmbed} = require('discord.js')

module.exports = {
    name: "announce",
    usage: "/announce [channel] [title] [description]",
    description: "Post an announcement in a channel.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "channel",
            description: "Specify a channel.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "title",
            description: "Write a title.",
            required: true,
            type: "STRING"
        },
        {
            name: "description",
            description: "Write a description.",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const {options, guild} = interaction

        try {
            const channel = options.getChannel("channel")
            const title = options.getString("title")
            const description = options.getString("description")

            const Embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor("RANDOM")

            guild.channels.cache.get(channel.id).send({embeds: [Embed]})

            interaction.reply({
                content: "Done",
                ephemeral: true,
            });
        } catch (err) {
            const errEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle("An error has occured.")
            .setDescription(`\`\`\`${err}\`\`\``);
            console.log(err);
            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}
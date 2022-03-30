const {CommandInteraction, MessageEmbed} = require('discord.js')

module.exports = {
    name: "announce",
    usage: "/announce",
    description: "Post an announcement in a channel.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "generate",
            description: "Generate an announcement.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Specify a channel to send the embed.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                },
                {
                    name: "colour",
                    description: "Provide a colour for the embed (ALL IN CAPITAL).",
                    type: "STRING"
                },
                {
                    name: "title",
                    description: "Provide a title for the embed.",
                    type: "STRING"
                },
                {
                    name: "url",
                    description: "Provide a url for the embed.",
                    type: "STRING"
                },
                {
                    name: "author",
                    description: "Provide an author for the embed.",
                    type: "STRING"
                },
                {
                    name: "description",
                    description: "Provide a description for the embed.",
                    type: "STRING"
                },
                {
                    name: "thumbnail",
                    description: "Provide a thumbnail for the embed.",
                    type: "STRING"
                },
                {
                    name: "image",
                    description: "Provide an image for the embed.",
                    type: "STRING"
                },
                {
                    name: "timestamp",
                    description: "Provide a timestamp for the embed.",
                    type: "BOOLEAN"
                },
                {
                    name: "footer",
                    description: "Provide a footer for the embed.",
                    type: "STRING"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const {options, guild} = interaction
        const subCommand = options.getSubcommand();

        try {
            const channel = options.getChannel("channel")
            const title = options.getString("title")
            const description = options.getString("description")
            const colour = options.getString("colour")
            const url = options.getString("url")
            const author = options.getString("author")
            const thumbnail = options.getString("thumbnail")
            const image = options.getString("image")
            const timestamp = options.getBoolean("timestamp")
            const footer = options.getString("footer") 
            
            switch (subCommand) {
                case "generate":
                    const embed = new MessageEmbed()
                        if(title) embed.setTitle(title)
                        if(description) embed.setDescription(description)
                        if(colour) embed.setColor(colour)
                        if(url && url.includes("http")) embed.setURL(url)
                        if(author) embed.setAuthor({name: author})
                        if(thumbnail) embed.setThumbnail(thumbnail)
                        if(image && image.includes("http")) embed.setImage(image)
                        if(timestamp) embed.setTimestamp()
                        if(footer) embed.setFooter({text: footer})

                        if(!channel) return interaction.reply({content: "No channel was provided.", ephemeral: true})
                       
                        if(!embed.title && !embed.description) {
                            embed.setDescription("You have not provided valid options!")
                        }

                        guild.channels.cache.get(channel.id).send({embeds: [embed]})

                        interaction.reply({
                            content: "Done",
                            ephemeral: true,
                        });
            }
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
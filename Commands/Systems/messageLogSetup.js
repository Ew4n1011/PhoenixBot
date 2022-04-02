const {CommandInteraction, MessageEmbed} = require('discord.js')
const DB = require('../../Structures/Schemas/messageDB.js')

module.exports = {
    name: 'messagelogsetup',
    description: 'Sets up the message logs channel.',
    usage: 'messagelogsetup',
    options: [
        {
            name: "messagedelete",
            description: "Sets up the message delete channel.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Sets the channel to log message deletions to.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "messageupdate",
            description: "Sets up the message update channel.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Sets the channel to log message updates to.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {options} = interaction

        const channel = options.getChannel("channel")
        if (!channel) return interaction.reply({content: "Please specify a channel to log messages to.", ephemeral: true})

        try {
            switch (options.getSubcommand()) {
                case "messagedelete":          
                
                await DB.findOneAndUpdate({GuildID: interaction.guild.id},
                    {ChannelID: channel.id},
                        {
                            new: true,
                            upsert: true
                        }
                    )

                    interaction.reply({content: "Done", ephemeral: true})
                break
                case "messageupdate":
                    await DB.findOneAndUpdate({ChannelID: channel.id}, {
                        new: true,
                        upsert: true
                    })

                    interaction.reply({content: "Done", ephemeral: true})
            }
        } catch (err) {
            const ErrEmbed = new MessageEmbed().setColor("RED")
            .setDescription(`\`\`\`${err}\`\`\``)

            interaction.reply({embeds: [ErrEmbed], ephemeral: true})
        }
    }
}
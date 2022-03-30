const {MessageEmbed, CommandInteraction, MessageActionRow, MessageButton} = require('discord.js')
const DB = require('../../Structures/Schemas/TicketSetup')

module.exports = {
    name: "ticketsetup",
    usage: "/ticketsetup",
    description: "Setup your ticketing message.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "channel",
            description: "Select the ticket creation channel.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "category",
            description: "Select the ticket channel's category.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_CATEGORY"]
        },
        {
            name: "transcripts",
            description: "Select the transcripts channel.",
            required: true,
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
        {
            name: "handlers",
            description: "Select the ticket handler's role.",
            required: true,
            type: "ROLE"
        },
        {
            name: "description",
            description: "Set the description of the ticket creation channel.",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {guild, options} = interaction

        try {
            const Channel = options.getChannel("channel")
            const Category = options.getChannel("category")
            const Transcripts = options.getChannel("transcripts")
            const Handlers = options.getRole("handlers")

            const Description = options.getString("description")

            await DB.findOneAndUpdate({GuildID: guild.id}, 
                {
                    ChannelID: Channel.id,
                    Category: Category.id,
                    Transcripts: Transcripts.id,
                    Handlers: Handlers.id,
                    Everyone: guild.id,
                    Description: Description,
                },
                {
                    new: true,
                    upsert: true
                }
            );
               
            const Buttons = new MessageActionRow()
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("ticket")
                .setLabel("Create Ticket!")
                .setStyle("PRIMARY")
                .setEmoji("🎫")
            )

            const Embed = new MessageEmbed().setAuthor({
                name: guild.name + " | Ticketing System",
                iconURL: guild.iconURL({dynamic: true})
            })
            .setDescription(Description)
            .setColor("#36393f")

            await guild.channels.cache.get(Channel.id).send({embeds: [Embed], components: [Buttons]})

            interaction.reply({content: "Done", ephemeral: true})
        } catch (err) {
            const ErrEmbed = new MessageEmbed().setColor("RED")
            .setDescription(`\`\`\`${err}\`\`\``)

            interaction.reply({embeds: [ErrEmbed], ephemeral: true})
        }
    }
}
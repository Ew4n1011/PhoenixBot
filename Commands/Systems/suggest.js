const {CommandInteraction, MessageEmbed} = require('discord.js')

module.exports = {
    name: "suggest",
    description: "Create a suggestion in an organised matter",
    options: [
        {
            name: "type",
            description : "Select the type",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Command",
                    value: "Command"
                },
                {
                    name: "Event",
                    value: "Event"
                },
                {
                    name: "System",
                    value: "System"
                },
                {
                    name: "Mod",
                    value: "Mod"
                },
                {
                    name: "Plugin",
                    value: "Plugin"
                }
            ]
        },
        {
            name: "name",
            description: "Provide a name for your suggestion.",
            type: "STRING",
            required: true
        },
        {
            name: "functionality",
            description: "Describe the functionality of this suggestion",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute (interaction) {
        const {options} = interaction

        const type = options.getString("type")
        const name = options.getString("name")
        const funcs = options.getString("functionality")

        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`${interaction.member} has suggested a ${type}.`)
        .addField("Name", `${name}`, true)
        .addField("Functionality", `${funcs}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("<:banhammer:928315266549547088>")
        message.react("<:10outof10:928315850270851082>")
    }
}
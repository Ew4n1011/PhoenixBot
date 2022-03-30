const {ButtonInteraction} = require('discord.js')
const DB = require('../../Structures/Schemas/suggestDB')

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return
        const {guildID, customId, message} = interaction

        if (!["suggest-accept", "suggest-decline"].includes(customId)) return;

        DB.findOne({GuildID: guildID, MessageID: message.id}, async(err, data) => {
            if(err) throw err
            if(!data) return interaction.reply({content: "No data was found in the database", ephemeral: true})

            const Embed = message.embeds[0]
            if(!Embed) return

            switch (customId) {
                case "suggest-accept": {
                    Embed.fields[2] = {name: "Status:", value: "Accepted", inline: true}
                    message.edit({embeds: [Embed.setColor("GREEN")]})
                    return interaction.reply({content: "Suggestion Accepted", ephemeral: true})
                }
                break 
                case "suggest-decline": {
                    Embed.fields[2] = {name: "Status:", value: "Declined", inline: true}
                    message.edit({embeds: [Embed.setColor("RED")]})
                    return interaction.reply({content: "Suggestion Declined", ephemeral: true})
                }
                break
            }
        })
    }
}
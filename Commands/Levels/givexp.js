const {CommandInteraction, MessageEmbed, Message} = require('discord.js')
const Levels = require('discord-xp')

module.exports = {
    name: "givexp",
    usage: "/givexp [member] [amount]",
    description: "Give xp to a member.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "member",
            description: "Select a member.",
            required: true,
            type: "USER"
        },
        {
            name: "amount",
            description: "Input an amount.",
            required: true,
            type: "STRING"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute (interaction) {
        const {options} = interaction

        const member = options.getUser("member")
        const amount = options.getString("amount")

        const Embed = new MessageEmbed()

        try {
            Levels.appendXp(member.id, interaction.guildId, amount)
            Embed.setColor("GREEN").setDescription(`✅ | Gave ${amount} xp to ${member}`)
            interaction.reply({embeds: [Embed], ephemeral: true})
        } catch (err) {
            Embed.setColor("RED").setDescription("⛔ | An error has occured.")
            interaction.reply({embeds: [Embed], ephemeral: true})
            console.log(err)
        }
    }
}
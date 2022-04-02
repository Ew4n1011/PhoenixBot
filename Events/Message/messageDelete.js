const {MessageEmbed, Message} = require('discord.js')
const DB = require('../../Structures/Schemas/messageDB.js')

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
        **Deleted Message**:\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1){
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        DB.findOne({GuildID: message.guildId}, (err, docs) => {
            if (err) throw err;
                if (!docs) return
            
            message.guild.channels.cache.get(docs.ChannelID).send({embeds: [Log]})
        })
    }
}
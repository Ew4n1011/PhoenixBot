const { Message, MessageEmbed } = require('discord.js') 
const Levels = require("discord-xp");
const { Database } = require('../../Structures/config.json');
Levels.setURL(Database);

module.exports = {
        name: "messageCreate",
        /**
         * 
         * @param {Message} message 
         * @returns 
         */
    async execute(message)  {
  if(message.author.bot || !message.guildId) return;

  const xp = Math.floor(Math.random() * 6) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.tag, message.guildId, xp)
  if(hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guildId);
    const Embed = new MessageEmbed().setColor("RANDOM").setDescription(`${message.author}, Congrats! You have leveled up to: **${user.level}**. :tada:`)
    message.channel.send({embeds: [Embed]})
    if (user.level == 4) {
        let role = message.guild.roles.cache.find(role => role.name === 'test role')
        message.member.roles.add(role)
    }
    }
    }
}
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

  const xp = Math.floor(Math.random() * 9) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guildId, xp)
  if(hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guildId);
    const Embed = new MessageEmbed().setColor("RANDOM").setDescription(`${message.author} congrats! You have leveled up to: **level ${user.level}**. :tada:`)
    message.channel.send({embeds: [Embed]})
    if (user.level == 5) {
        message.member.roles.add('863850965995880458')
    }
    if (user.level == 10) {
        message.member.roles.add('863851122719195156')
    }
    if (user.level == 20) {
        message.member.roles.add('863851219155550258')
    }
    if (user.level == 50) {
        message.member.roles.add('863851286210150443')
    }
    if (user.level == 100) {
        message.member.roles.add('863851340056494130')
    }
}
}
}
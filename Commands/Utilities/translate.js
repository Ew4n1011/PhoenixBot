const translate = require(`@iamtraction/google-translate`);
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'translate',
    usage: "/translate",
    description: 'Translate any word to any language you want.',
    options: [
        {
            name: 'lang',
            description: 'the languge to translate to',
            type: 'STRING',
            required: true,
        },
        {
            name: 'message',
            description: 'the message to translate ',
            type: 'STRING',
            required: true,
        },
    ],
    async execute(interaction, args, client) {
        const la = interaction.options.getString(`lang`);
        const msg = interaction.options.getString(`message`);

        translate(msg, { to: la })
            .then((res) => {
                var ee = new MessageEmbed()
                    .setTitle(`Translate`)
                    .setColor(`BLUE`)
                    .setTimestamp()
                    .addFields(
                        {
                          name: "Input",
                          value: `${msg}`,
                          inline: false,
                        },
                        {
                          name: "Output",
                          value: `${res.text}`,
                          inline: false,
                        },
                        {
                          name: "Language",
                          value: `${la}`,
                          inline: false,
                        }
                    );
                interaction.reply({ embeds: [ee] });
            })
            .catch((err) => {
                interaction.reply({ content: `${err.message}` });
            });
    },
};
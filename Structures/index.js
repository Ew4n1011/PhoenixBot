const {promisify} = require('util');
const {glob} = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { Client, Collection } = require("discord.js");
const client = new Client({intents:32767});
const config = require("./config.json");

client.commands = new Collection();

require('../Systems/giveawaySys')(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(config.token);
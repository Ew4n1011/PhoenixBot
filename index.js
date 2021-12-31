const { Client } = require("discord.js");
const client = new Client({intents:32767});
const config = require("./config.json")

const prefix = "$";

require("./Handlers/Events")(client);

client.login(config.token)
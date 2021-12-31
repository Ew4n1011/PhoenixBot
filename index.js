const { Client } = require("discord.js");
const client = new Client({intents:32767});
require('dotenv').config();

const prefix = "$";

require("./Handlers/Events")(client);

client.login(process.env.TOKEN)
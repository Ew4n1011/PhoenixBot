const {Client} = require('discord.js')
require('dotenv').config();
const mongoose = require('mongoose')
const {Database} = process.env.MONGO
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("The bot is now ready!")
        client.user.setActivity("UNDER CONSTRUCTION", {type: "WATCHING"})

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The bot is now connected to mongo!")
        }).catch((err) => {
            console.log(err)
        })
    }
}
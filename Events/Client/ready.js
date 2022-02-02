const {Client} = require('discord.js')
const mongoose = require('mongoose')
const {Database} = require("../../Structures/config.json")
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`Client logged in as ${client.user.tag}`)
        console.log("The bot is now ready!")
        client.user.setActivity("🚧 UNDER CONSTRUCTION", {type: "WATCHING"})

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The bot is now connected to mongo!")
        }).catch((err) => {
            console.once(err)
        })
    }
}
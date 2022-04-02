const { model, Schema } = require('mongoose');

module.exports = model("messageDB", new Schema({
    GuildID: String,
    ChannelID: String
}))
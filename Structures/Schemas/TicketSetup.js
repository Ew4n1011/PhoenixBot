const { model, Schema } = require('mongoose');

module.exports = model("TicketSetup", new Schema({
    GuildID: String,
    ChannelID: String,
    Category: String,
    Transcripts: String,
    Handlers: String,
    Everyone: String,
    Description: String,
    IDs: Number
}))
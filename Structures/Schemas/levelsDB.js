const {model, Schema} = require('mongoose')

module.exports = model("levelsDB", new Schema({
    GuildID: String,
    Role1: String,
    Role2: String,
    Role3: String,
    Role4: String,
    Role5: String,
    Rank1: String,
    Rank2: String,
    Rank3: String,
    Rank4: String,
    Rank5: String
}))
const { model, Schema } = require("mongoose");

module.exports = model(
  "Tickets",
  new Schema({
    GuildID: String,
    MembersID: [String],
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    Type: String,
    Claimed: Boolean,
    ClaimedBy: String,
    OpenTime: String,
  })
);
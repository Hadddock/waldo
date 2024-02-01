const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player_name: { type: String, required: true, maxLength: 100, minLength: 1 },
  time: { type: Number, required: true },
  jwt: { type: String },
});

ScoreSchema.virtual("display_time").get(function () {
  return this.time;
});

module.exports = mongoose.model("Score", ScoreSchema);

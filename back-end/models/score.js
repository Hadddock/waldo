const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player_name: { type: String, required: true, maxLength: 100 },
  time: { type: Number, required: true },
});

ScoreSchema.virtual("dsplay_time").get(function () {
  return this.time;
});

module.exports = mongoose.Model("Score", ScoreSchema);

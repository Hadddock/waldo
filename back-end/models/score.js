const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player_name: { type: String, required: true, maxLength: 100 },
  score: { type: Number, required: true },
});

ScoreSchema.virtual("time").get(function () {
  return this.score;
});

module.exports = mongoose.Model("Score", ScoreSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player_name: { type: String, required: true, maxLength: 100, minLength: 1 },
  time: { type: Number, required: true },
  jwt: { type: String },
});

ScoreSchema.virtual("display_time").get(function () {
  const ms = this.time;

  const totalSeconds = ms / 1000;
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(
    Math.floor((totalSeconds - hours * 3600) / 60)
  ).padStart(2, "0");
  const seconds = String(
    (totalSeconds - hours * 3600 - minutes * 60).toFixed(3)
  ).padStart(6, "0");

  return `${hours}:${minutes}:${seconds}`;
});

module.exports = mongoose.model("Score", ScoreSchema);

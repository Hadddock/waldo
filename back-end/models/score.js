const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player_name: { type: String, required: true, maxLength: 100, minLength: 1 },
  time: { type: Number, required: true },
  jwt: { type: String },
});

ScoreSchema.virtual("display_time").get(function () {
  const ms = this.time;

  const remainingMilliseconds = ms % 1000;
  const totalSeconds = Math.round(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return `${minutes}:${seconds}.${remainingMilliseconds}`;
});

module.exports = mongoose.model("Score", ScoreSchema);

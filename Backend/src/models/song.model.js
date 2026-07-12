const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: { type: String, required: true },
  posterURL: { type: String, required: true },
  title: { type: String, required: true },
  mood: {
    type: String,
    required: true,
    enum: {
      values: ["happy", "sad", "surprised"],
      message: "Mood must be one of the following: happy, sad, surprised",
    },
  },
});

const songModel = mongoose.model("Song", songSchema);
module.exports = songModel;

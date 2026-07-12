const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

const DEFAULT_POSTER_URL =
  "https://placehold.co/600x600/111827/f5f5f5?text=moodify.mp3";

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;
  const tags = id3.read(songBuffer);
  const posterBuffer = tags.image?.imageBuffer;

  //   const songFile = await storageService.uploadFile({    first song file was uploaded and then the poster file was uploaded, hence longer time taken for both uploads to complete.
  //     buffer: songBuffer,
  //     filename: tags.title + ".mp3",
  //     folder: "moodify/songs",
  //   });
  //   const posterFile = await storageService.uploadFile({
  //     buffer: tags.image.imageBuffer,
  //     filename: tags.title+".jpeg",
  //     folder: "moodify/posters",
  //   });
  const [songFile, posterFile] = await Promise.all([
    //but now both are uploaded in parallel using Promise.all thus reducing the total time taken for both uploads to complete.
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "moodify/songs",
    }),
    posterBuffer
      ? storageService.uploadFile({
          buffer: posterBuffer,
          filename: tags.title + ".jpeg",
          folder: "moodify/posters",
        })
      : Promise.resolve({ url: DEFAULT_POSTER_URL }),
  ]);
  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterURL: posterFile.url,
    mood: mood,
  });

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
  console.log(tags);
}

async function getSong(req, res) {
  const { mood } = req.query;
  const song = await songModel.findOne({ mood });
  
res.status(200).json({
  message: "Song fetched successfully",
  song,
});
}

module.exports = { uploadSong, getSong };

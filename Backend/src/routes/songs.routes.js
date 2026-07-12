const express = require("express");
const router = express.Router();
const songModel = require("../models/song.model");
const uploadMiddleware = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.controller");

router.post("/", uploadMiddleware.single("song"), songController.uploadSong);
router.get("/", songController.getSong)

module.exports = router;

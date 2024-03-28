const express = require("express");
const { body, validationResult } = require("express-validator");
const Feed = require("../models/feed.model");
const fs = require("fs");
const { getPath } = require("../helper");

const router = express.Router();

function makeFileName(ext) {
  const fileName = `${Date.now()}`;
  const fileExtension = ext.length ? ext.split("/")[1] : "png";
  return `${fileName}.${fileExtension}`;
}

function saveBase64ToFile(base64String, uploadDir, filename) {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const filePath = `${uploadDir}/${filename}`;
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log("File saved successfully:", filePath);
    }
  });
}

router.post(
  "/",
  [
    body("images").isArray().withMessage("Images Array is required"),
    body("text").notEmpty().withMessage("Text content is required"),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const imageFilenames = [];

      for (const image of req.body.images) {
        const fileName = makeFileName(image.ext);
        saveBase64ToFile(image.base64, getPath("uploads"), fileName);

        imageFilenames.push(fileName);
      }

      const newFeedItem = new Feed({
        text: req.body.text,
        images: imageFilenames,
      });

      const savedFeedItem = await newFeedItem.save();

      res.status(201).json(savedFeedItem);
    } catch (error) {
      console.error("Error creating feed item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/", async function (req, res, next) {
  try {
    const feedItems = await Feed.find().sort({ createdAt: -1 });

    res.json(feedItems);
  } catch (error) {
    console.error("Error retrieving feed items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

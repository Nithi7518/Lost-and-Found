// routes/items.js
const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  getUserItems,
  deleteItem,
  getItemResponses,
  getClaimedItems,
} = require("../controllers/itemController");
const { protect } = require("../middleware/auth");
const upload = require("../utils/upload");

// Get all items with search and filter
router.get("/", getItems);

// Route definition
router.post(
  "/",
  protect, // Use it directly as middleware
  function (req, res, next) {
    upload.single("image")(req, res, next);
  },
  createItem
);

router.get("/user", protect, getUserItems);

router.delete("/:itemId", protect, deleteItem);

router.get("/:itemId/responses", protect, getItemResponses);

router.get("/claimed", protect, getClaimedItems);

module.exports = router;

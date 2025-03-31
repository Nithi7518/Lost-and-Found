const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");
const upload = require("../utils/upload");

// Get all items with search and filter
router.get("/", itemController.getItems);

// Create new item (protected route)
router.post("/", auth, upload.single("image"), itemController.createItem);

module.exports = router;

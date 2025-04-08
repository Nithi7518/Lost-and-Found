const Item = require("../models/Item");
const User = require("../models/User");
const VerificationQuestion = require("../models/VerificationQuestion");

// Create a new item (lost or found)
exports.createItem = async (req, res) => {
  try {
    const { name, category, description, date, time, location, type } =
      req.body;

    // Create new item
    const newItem = new Item({
      name,
      category,
      description,
      date: new Date(date),
      time,
      location,
      type,
      user: req.user.id,
      image: req.file ? req.file.filename : "default.jpg",
    });

    const savedItem = await newItem.save();

    // Handle verification questions for found items
    if (type === "found") {
      if (!req.body.questions) {
        return res.status(400).json({
          success: false,
          message: "Verification questions required for found items",
        });
      }

      let questions;
      try {
        questions = JSON.parse(req.body.questions);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "Invalid questions format",
        });
      }

      const verificationQuestions = new VerificationQuestion({
        itemId: savedItem._id,
        questions: questions.map((q) => ({
          question: q.question,
          answer: q.answer,
        })),
      });

      await verificationQuestions.save();
    }

    // Update user's items
    await User.findByIdAndUpdate(req.user.id, {
      $push: { itemsReported: savedItem._id },
    });

    res.status(201).json({
      success: true,
      item: savedItem,
    });
  } catch (error) {
    console.error("Item creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all items with search and filter
exports.getItems = async (req, res) => {
  try {
    const { search, category, type } = req.query;

    // Build query object
    const query = {};

    // Add type filter (lost or found)
    if (type) {
      query.type = type;
    }

    // Add category filter
    if (category && category !== "All Categories") {
      query.category = category;
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query
    const items = await Item.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

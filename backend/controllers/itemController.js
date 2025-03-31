const Item = require("../models/Item");
const User = require("../models/User");

// Create a new item (lost or found)
exports.createItem = async (req, res) => {
  try {
    const { name, category, description, date, time, location, type } =
      req.body;

    // Create new item with image if provided
    const newItem = new Item({
      name,
      category,
      description,
      date,
      time,
      location,
      type, // 'lost' or 'found'
      user: req.user.id,
      image: req.file ? req.file.filename : "default.jpg",
    });

    // Save item to database
    const savedItem = await newItem.save();

    // Add item to user's items
    await User.findByIdAndUpdate(req.user.id, {
      $push: { itemsReported: savedItem._id },
    });

    res.status(201).json({
      success: true,
      item: savedItem,
    });
  } catch (error) {
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

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

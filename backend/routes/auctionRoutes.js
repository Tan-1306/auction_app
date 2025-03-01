const express = require("express");
const AuctionItem = require("../models/auctions");

const router = express.Router();


router.post("/add", async (req, res) => {
    const { itemName, price } = req.body;
    try {
        const newItem = new AuctionItem({ itemName, price });
        await newItem.save();
        res.status(201).json({ message: "Auction item added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding item" });
    }
});


router.get("/", async (req, res) => {
    try {
        const items = await AuctionItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Error fetching items" });
    }
});

module.exports = router;

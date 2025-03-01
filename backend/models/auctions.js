const mongoose = require("mongoose");

const AuctionItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model("AuctionItem", AuctionItemSchema);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); 
const AuctionItem = require("./models/auctions");

const app = express();


app.use(express.json()); 
app.use(cors());


mongoose.connect("mongodb://localhost:27017/auctionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));


app.post("/api/users/register", async (req, res) => {
    console.log("Received Data:", req.body); 
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: "Server error" });
    }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

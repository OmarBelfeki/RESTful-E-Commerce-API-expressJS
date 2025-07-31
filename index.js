const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();


app.use(cors());
app.use(bodyParser.json());

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.log("❌ MongoDB connection failed", error);
        process.exit(1);
    }
};

connectDb();

app.get("/", (req, res) => {
    res.send("hy this work by <a href='https://www.linkedin.com/in/omar-belfeki-59b9a62b6'>Omar Belfeki</a> go to /api or go to how test<br><a href='https://github.com/OmarBelfeki/RESTful-E-Commerce-API-expressJS/blob/main/test.http'>How to test</a>")
})

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

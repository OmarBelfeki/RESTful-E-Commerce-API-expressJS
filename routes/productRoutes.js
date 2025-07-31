const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get("/", async (req, res) => {
    const products = await Product.find().populate("category");
    res.json(products);
});

router.put("/:id", async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
});

router.delete("/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: "Product deleted"})
});

module.exports = router
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');


router.post("/add", async (req, res) => {
    const {productId, quantity} = req.body;
    const product = await Product.findById(productId);

    if(!product || product.stock < quantity){
        return res.status(400).json({error: "Not enough stock"});
    }

    let cart = await Cart.findOne();
    if(!cart) cart = new Cart({products: [], totalPrice: 0});

    cart.products.push({product: productId, quantity});
    cart.totalPrice += product.price * quantity;
    await cart.save();
    res.json(cart);
});


router.get("/", async (req, res) => {
    const cart = await Cart.findOne().populate("products.product");
    res.json(cart);
});

module.exports = router

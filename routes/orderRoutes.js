const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');


router.post("/checkout", async (req, res) => {
    const cart = await Cart.findOne().populate("products.product");
    if(!cart) return res.status(400).json({error: "Cart is empty"});

    for(let item of cart.products){
        let prod = await Product.findById(item.product._id);
        prod.stock -= item.quantity;
        await prod.save();
    }

    // Simulate payment success
    const order = new Order({
        cart: cart._id,
        paymentStatus: "Paid"
    });
    await order.save();

    await Cart.deleteOne({_id: cart._id});

    res.json({message: "Order placed successfully", order});
});

module.exports = router;

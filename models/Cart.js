const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: {type: Number, default: 1},
    }],
    totalPrice: {type: Number, default: 0}
});

module.exports = mongoose.model("Cart", CartSchema);

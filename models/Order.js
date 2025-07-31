const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
    paymentStatus: {type: String, default: "Pending"},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Order", OrderSchema);

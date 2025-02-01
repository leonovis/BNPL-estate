const mongoose = require('mongoose');

const BNPLTransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    totalPrice: Number,
    upfrontPayment: { type: Boolean, default: false},
    monthlyPayment: Number,
    interestRate: { type: Number, default: 5},
    payments: [
        {
            amount: Number,
            date: Date,
            missed: { type: Boolean, default: false }
        },
    ],
    missedPayments: { type: Number, default: 0},
    status: { type: String, enum: ["active", "warning", "repossession"], default: "active"},
});

module.exports = mongoose.model("BNPLTransaction", BNPLTransactionSchema);
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    price: { type: Number, required: true },
    location: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    locked: { type: Boolean, default: true }, // property is locked until 50% paid
    resellable: { type: Boolean, default: false }, // property can be resold
});

module.exports = mongoose.model('Property', propertySchema);
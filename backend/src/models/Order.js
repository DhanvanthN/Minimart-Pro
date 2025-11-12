const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: Number, price: Number }],
  total: Number,
  shippingAddress: Object,
  status: { type: String, enum: ['pending','paid','shipped','completed','cancelled'], default: 'pending' },
  paymentInfo: Object
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

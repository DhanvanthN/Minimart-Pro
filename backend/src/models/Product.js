const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  categories: [String],
  stock: Number,
  attributes: Object,
}, { timestamps: true });

productSchema.index({ title: 'text', categories: 1 });

module.exports = mongoose.model('Product', productSchema);

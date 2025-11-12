const Product = require('../models/Product');

async function list(req, res){
  const { q, page = 1, limit = 12 } = req.query;
  const query = q ? { $text: { $search: q } } : {};
  const products = await Product.find(query).skip((page-1)*limit).limit(parseInt(limit));
  res.json(products);
}
async function getById(req, res){
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
}
async function create(req, res){
  const p = await Product.create(req.body);
  res.json(p);
}
async function update(req, res){
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
}
async function remove(req, res){
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}

module.exports = { list, getById, create, update, remove };

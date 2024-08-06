const Product = require('../models/productModel');

const addProduct = async (req, res) => {
  // console.log("hahahah");
  // console.log(req.body);

  const { name, price, quantity, images ,userId} = req.body;
  try {
    // Create new product with received data
    const newProduct = new Product({
      name,
      price,
      quantity,
      images,  // images should be an array of URLs
      user: userId  // Assuming user ID is set in request from middleware
    });

    await newProduct.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.log("error",error);

    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
module.exports = { addProduct,getAllProducts };

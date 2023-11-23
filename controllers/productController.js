import { validationResult } from 'express-validator';
import Product from '../models/product.js';

export function getAllProducts(req, res) {
  Product.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addProduct(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  Product.create(req.body)
    .then((newProduct) => {
      res.status(201).json(newProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getProductById(req, res) {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function updateProduct(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  const updatedProduct = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    quantity: req.body.quantity,
    restaurant: req.body.restaurant,
  };

  Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function deleteProduct(req, res) {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

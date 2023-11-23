import { validationResult } from 'express-validator';
import Order from '../models/order.js';

export function addOrder(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.create(req.body)
    .then((newOrder) => {
      res.status(201).json(newOrder);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getAllOrders(req, res) {
  Order.find()
    .populate('items.product', 'title') // Populate the product details
    .populate('client', 'username email') // Populate the client details
    .exec()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getOrderById(req, res) {
  const orderId = req.params.id;

  Order.findById(orderId)
    .populate('items.product', 'title') // Populate the product details
    .populate('client', 'username email') // Populate the client details
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function updateOrder(req, res) {
  const orderId = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((updatedOrder) => {
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function deleteOrder(req, res) {
  const orderId = req.params.id;

  Order.findByIdAndRemove(orderId)
    .then((deletedOrder) => {
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

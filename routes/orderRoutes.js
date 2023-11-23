import express from 'express';
import { body, param } from 'express-validator';
import { getAllOrders, addOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.route('/orders')
  .get(getAllOrders)
  .post(
    body('status').isIn(['pending', 'accepted', 'declined']),
    body('items').isArray(),
    body('items.*.product').isMongoId(),
    body('items.*.quantity').isNumeric(),
    body('totalAmount').isNumeric(),
    body('client').isMongoId(),
    addOrder
  );

router.route('/orders/:id')
  .get(param('id').isMongoId(), getOrderById)
  .put(
    param('id').isMongoId(),
    body('status').isIn(['pending', 'accepted', 'declined']),
    body('items').isArray(),
    body('items.*.product').isMongoId(),
    body('items.*.quantity').isNumeric(),
    body('totalAmount').isNumeric(),
    body('client').isMongoId(),
    updateOrder
  )
  .delete(param('id').isMongoId(), deleteOrder);

export default router;

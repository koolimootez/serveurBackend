import express from 'express';
import { body, param } from 'express-validator';
import { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/products')
  .get(getAllProducts)
  .post(
    body('title').isString(),
    body('category').isString(),
    body('description').isString(),
    body('price').isNumeric(),
    body('image').isString(),
    body('quantity').isNumeric(),
    body('restaurant').isMongoId(),
    addProduct
  );

router.route('/products/:id')
  .get(param('id').isMongoId(), getProductById)
  .put(
    param('id').isMongoId(),
    body('title').isString(),
    body('category').isString(),
    body('description').isString(),
    body('price').isNumeric(),
    body('image').isString(),
    body('quantity').isNumeric(),
    body('restaurant').isMongoId(),
    updateProduct
  )
  .delete(param('id').isMongoId(), deleteProduct);

export default router;

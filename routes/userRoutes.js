import express from 'express';
import { body, param } from 'express-validator';
import { getAllUsers, addUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/users')
  .get(getAllUsers)
  .post(
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 6 }),
    body('email').isEmail(),
    body('phoneNumber').isLength({ min: 8, max: 14 }),
    body('adresse').notEmpty(),
    body('role').notEmpty(),
    addUser
  );

router.route('/users/:id')
  .get(param('id').isMongoId(), getUserById)
  .put(
    param('id').isMongoId(),
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 6 }),
    body('email').isEmail(),
    body('phoneNumber').isLength({ min: 10 }),
    body('adresse').notEmpty(),
    body('role').notEmpty(),
    updateUser
  )
  .delete(param('id').isMongoId(), deleteUser);

export default router;

import express from 'express';
import { body, param } from 'express-validator';
import { getAllUsers, addUser, getUserById, updateUser, deleteUser ,login , search , resetPassword} from '../controllers/userController.js';

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
    body('phoneNumber').isLength({ min: 8 }),
    body('adresse').notEmpty(),
    body('role').notEmpty(),
    updateUser
  )
  .delete(param('id').isMongoId(), deleteUser);


  router.route('/login')
  
  .post(
    body('email').isEmail(),
    body('password').isLength({min:6}),
    login
  );

  router.route('/search')
  .post(
    body('email'),
    search
  );
  router.route('/resetpassword')
  .post(
    body('email').isEmail(),
    body('password').isLength({min : 6}),
    resetPassword
  )





  
export default router;

import express from 'express';
import { body, param } from 'express-validator';
import { getAllBeneficiaires, addBeneficiaire, getBeneficiaireById , updatedBeneficiaire ,deleteBeneficiaire , resetPassword , search , login} from '../controllers/beneficiaireController.js';

const router = express.Router();

router.route('/beneficiaires')
  .get(getAllBeneficiaires)
  .post(
    body('mission').isString(),
    // Ajoutez d'autres validations au besoin
    addBeneficiaire
  );

router.route('/beneficiaires/:id')
  .get(param('id').isMongoId(), getBeneficiaireById) 
  .put(
    param('id').isMongoId(),
    body('username').isLength({ min: 4 }),
    body('password').isLength({ min: 6 }),
    body('email').isEmail(),
    body('phoneNumber').isLength({ min: 8 }),
    body('adresse').notEmpty(),
    body('role').notEmpty(),
    body('mission').notEmpty(),
    updatedBeneficiaire
  )
  .delete(param('id').isMongoId(), deleteBeneficiaire);
  
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

  router.route('/login')
  
  .post(
    body('email').isEmail(),
    body('password').isLength({min:6}),
    login
  );
export default router;

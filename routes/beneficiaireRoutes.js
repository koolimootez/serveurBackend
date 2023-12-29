import express from 'express';
import { body, param } from 'express-validator';
import { getAllBeneficiaires, addBeneficiaire, getBeneficiaireById , updatedBeneficiaire ,deleteBeneficiaire , login} from '../controllers/beneficiaireController.js';

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
  

export default router;

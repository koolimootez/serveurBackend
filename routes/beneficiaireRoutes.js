import express from 'express';
import { body, param } from 'express-validator';
import { getAllBeneficiaires, addBeneficiaire, getBeneficiaireById } from '../controllers/beneficiaireController.js';

const router = express.Router();

router.route('/beneficiaires')
  .get(getAllBeneficiaires)
  .post(
    body('mission').isString(),
    // Ajoutez d'autres validations au besoin
    addBeneficiaire
  );

router.route('/beneficiaires/:id')
  .get(param('id').isMongoId(), getBeneficiaireById);
  // Ajoutez d'autres routes au besoin

export default router;

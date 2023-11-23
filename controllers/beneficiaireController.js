
import { validationResult } from 'express-validator';
import Beneficiaire from '../models/beneficiaire.js';

export function addBeneficiaire(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Beneficiaire.create(req.body)
    .then((newBeneficiaire) => {
      res.status(201).json(newBeneficiaire);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getAllBeneficiaires(req, res) {
  Beneficiaire.find()
    .exec()
    .then((beneficiaires) => {
      res.status(200).json(beneficiaires);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

export function getBeneficiaireById(req, res) {
  const beneficiaireId = req.params.id;

  Beneficiaire.findById(beneficiaireId)
    .exec()
    .then((beneficiaire) => {
      if (!beneficiaire) {
        return res.status(404).json({ message: 'Beneficiaire not found' });
      }
      res.status(200).json(beneficiaire);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Ajoutez d'autres fonctions du contrôleur bénéficiaire ici au besoin



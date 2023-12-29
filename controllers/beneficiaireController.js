
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
export function updatedBeneficiaire(req,res){
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }
  const updatedBeneficiaire = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    adresse: req.body.adresse,
    role: req.body.role, 
    mission:req.body.mission
    };
  Beneficiaire.findByIdAndUpdate(req.params.id, updatedBeneficiaire, { new: true })
  .then((beneficiaire) => {
    if (!beneficiaire) {
      return res.status(404).json({ message: 'beneficiaire not found' });
    }
    res.status(200).json(beneficiaire);
  })
  .catch((err) => {
    res.status(500).json({ error: err });
  });
}

export function deleteBeneficiaire(req, res) {
  Beneficiaire.findByIdAndRemove(req.params.id)
    .then((beneficiaire) => {
      if (!beneficiaire) {
        return res.status(404).json({ message: 'beneficiaire not found' });
      }
      res.status(200).json({ message: 'beneficiaire deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Ajoutez d'autres fonctions du contrôleur bénéficiaire ici au besoin



import mongoose from 'mongoose';
import User from './user.js';

const { Schema } = mongoose;

const beneficiaireSchema = new Schema(
  {
    mission: {
      type: String,
      required: true,
    },
    // Ajoutez d'autres propriétés spécifiques au bénéficiaire ici
  },
  {
    timestamps: true,
  }
);

const Beneficiaire = User.discriminator('Beneficiaire', beneficiaireSchema);

export default Beneficiaire;

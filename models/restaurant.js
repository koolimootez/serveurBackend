import mongoose from 'mongoose';
import User from './user.js';

const { Schema } = mongoose;

// Schéma spécifique pour les restaurants étendu à partir du modèle utilisateur de base
const restaurantSchema = new Schema(
  {
    category: {
      type: String,
      enum: ['Healthy', 'Fast Food', 'Gluten Free'],
      required: true,
    },
    image: {
        type: String,
        required: true,
      },
    description: {
          type: String,
          required: true,
        },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    // Ajoutez d'autres propriétés spécifiques au restaurant ici
  },
  { timestamps: true }
);

// Création du modèle de restaurant en tant que sous-type de l'utilisateur
const Restaurant = User.discriminator('Restaurant', restaurantSchema);

export default Restaurant;

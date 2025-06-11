import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Store from './models/store.model';

dotenv.config();

const seedUser = {
  auth0Id: 'google-oauth2|105455038665731688388',
  firstName: 'test',
  lastName: 'user',
  email: 'test@test.com',
  password: 'test1234',
  isActive: true,
};

const MONGODB_URI = process.env.MONGODB_URI || '';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const seedStores = [
      {
        name: 'Shop 1',
        auth0Id: seedUser.auth0Id,
        isActive: true,
      },
      {
        name: 'Shop 2',
        auth0Id: seedUser.auth0Id,
        isActive: true,
      },
    ];

    const stores = await Store.insertMany(seedStores);
    console.log('Stores seeded successfully:', stores);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedDatabase();

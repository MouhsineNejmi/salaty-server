import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Store from './models/store.model';

dotenv.config();

const seedUser = {
  id: 'google-oauth2|105455038665731688388',
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
        userId: '684ace4f62a64db1d319e11a',
        isActive: true,
      },
      {
        name: 'Shop 2',
        userId: '684ace4f62a64db1d319e11a',
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

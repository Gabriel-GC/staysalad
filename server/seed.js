const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const Settings = require('./models/Settings');
require('dotenv').config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/staysalad');
    console.log('Clearing DB...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Settings.deleteMany();

    // Create Admin
    const admin = new User({ username: 'admin', password: 'password123' });
    await admin.save();
    console.log('Admin user created (admin / password123)');

    // Create Categories
    const cat1 = await new Category({ name: 'Bowls', slug: 'bowls', order: 1 }).save();
    const cat2 = await new Category({ name: 'Saladas', slug: 'saladas', order: 2 }).save();
    const cat3 = await new Category({ name: 'Bebidas', slug: 'bebidas', order: 3 }).save();
    console.log('Categories created');

    // Create Products
    await new Product({
      name: 'Salada Caesar Premium',
      description: 'Frango grelhado e alface romana.',
      price: 32.90,
      category: cat2._id,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80'
    }).save();

    await new Product({
      name: 'Bowl Atum Fresh',
      description: 'Atum marinado e edamame.',
      price: 38.00,
      category: cat1._id,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
    }).save();
    console.log('Products created');

    // Create Settings
    await new Settings({
      header: { promoText: 'Frete grátis em pedidos acima de R$ 50!', contactPhone: '+55 47 99999-9999' },
      footer: { address: 'Rua das Saladas, 123 - Joinville, SC' },
      aboutPage: { richText: 'A StaySalad nasceu de um desejo simples: tornar a comida de verdade acessível.' },
      homeBanners: [{ imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80', link: '/produtos' }]
    }).save();
    console.log('Settings created');

    console.log('Seed completed successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();

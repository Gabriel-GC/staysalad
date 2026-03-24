const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const Settings = require('./models/Settings');
require('dotenv').config();

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/staysalad';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    console.log('Limpando banco de dados...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Settings.deleteMany();

    // 1. Criar Usuário Admin Padrão
    const admin = new User({ username: 'admin', password: 'password123' });
    await admin.save();
    console.log('✅ Usuário Admin criado: admin / password123');

    // 2. Criar Categorias Iniciais
    const catsData = [
      { name: 'Saladas', slug: 'saladas', order: 1 },
      { name: 'Sucos', slug: 'sucos', order: 2 },
      { name: 'Sobremesas', slug: 'sobremesas', order: 3 },
      { name: 'Bowls', slug: 'bowls', order: 4 }
    ];
    const categories = await Category.insertMany(catsData);
    console.log('✅ Categorias iniciais criadas');

    // 3. Criar Configurações Iniciais
    await new Settings({
      header: { promoText: 'Frete grátis em pedidos acima de R$ 50!', contactPhone: '+55 47 99999-9999' },
      footer: { address: 'Rua das Saladas, 123 - Joinville, SC' },
      aboutPage: { richText: 'A StaySalad nasceu para transformar sua rotina com sabor e frescor.' },
      homeBanners: [{ imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80', link: '/produtos' }]
    }).save();
    console.log('✅ Configurações iniciais criadas');

    // 4. Criar alguns produtos de exemplo
    await new Product({
      name: 'Salada Caesar Premium',
      description: 'Frango grelhado, alface romana e croutons.',
      price: 32.90,
      category: categories[0]._id,
      isFeatured: true,
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80'
    }).save();

    console.log('🚀 Seed finalizado com sucesso!');
    process.exit();
  } catch (err) {
    console.error('❌ Erro no Seed:', err);
    process.exit(1);
  }
};

seed();

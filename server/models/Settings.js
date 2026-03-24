const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Singleton Pattern: all settings in one object
  header: {
    promoText: { type: String, default: 'Frete grátis em pedidos acima de R$ 50!' },
    contactPhone: { type: String, default: '+55 00 00000-0000' }
  },
  footer: {
    address: { type: String, default: 'Rua das Saladas, 123 - Centro' },
    socialLinks: {
      instagram: { type: String, default: '#' },
      facebook: { type: String, default: '#' },
      whatsapp: { type: String, default: '#' }
    }
  },
  aboutPage: {
    richText: { type: String, default: 'A StaySalad nasceu para transformar sua rotina...' },
    image: { type: String, default: '' }
  },
  homeBanners: [{
    imageUrl: { type: String },
    link: { type: String, default: '/produtos' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);

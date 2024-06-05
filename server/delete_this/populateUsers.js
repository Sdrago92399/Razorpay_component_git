const User = require('../models/User');
const Products = require('../models/Product');

const users = [
  {username: 'user1', email: 'user1@example.com', password: 'password1', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  {username: 'user2', email: 'user2@example.com', password: 'password2', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  {username: 'user3', email: 'user3@example.com', password: 'password3', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  {username: 'user4', email: 'user4@example.com', password: 'password4', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  {username: 'user5', email: 'user5@example.com', password: 'password5', image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
];

const products = [
  {name: 'keyboard', description: 'Overclocked RGB Mechanical Gaming Keyboard 16.8 Million Color LED Backlight', price: 500, image: 'https://images-na.ssl-images-amazon.com/images/I/71my4oT-ZrL.jpg' },
  {name: 'mouse', description: 'Overclocked RGB Gaming Mouse Inward module', price: 200, image: 'https://thermaltake.azureedge.net/pub/media/wysiwyg/key3/img/L20rgbmouse/pic3m.jpg' },
  {name: 'CPU', description: 'Overclocked RGB Lian Li O11 Dynamic XL Mega SLI Build', price: 10000, image: 'https://preview.redd.it/csykfw911xy31.jpg?auto=webp&s=a7f2ddcb935f43a93efbef0474ddc394e1fe6747' },
  {name: 'Monitor', description: 'Overclocked RGB Razer\'s Raptor Gaming Monitor 144hz WQHD HDR FreeSync', price: 1000, image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
  {name: 'Mouse-pad', description: 'A simple keyboard', price: 9500, image: 'https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain' },
];

exports.populateDB = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    await Products.deleteMany({});
    await Products.insertMany(products);
    console.log('Database populated with sample users and products');
  } catch (error) {
    console.error('Error populating database', error);
  }
};
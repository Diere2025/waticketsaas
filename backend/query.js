const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('whaticketsaas', 'whaticket_user', 'mysql123456', { host: 'localhost', dialect: 'postgres' });

async function run() {
  const [c] = await sequelize.query('SELECT id, name, number FROM "Contacts" ORDER BY id DESC LIMIT 5'); 
  console.log('Contacts:', c); 
  process.exit(0); 
} 
run();

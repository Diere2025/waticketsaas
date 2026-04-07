const { Sequelize } = require('sequelize');
const s = new Sequelize('whaticketsaas', 'whaticket_user', 'mysql123456', { host: 'localhost', dialect: 'postgres', logging: false });

async function run() {
  await s.query('UPDATE "Whatsapps" SET "promptId" = 1 WHERE "id" = 2;');
  console.log('Updated Connection promptId!');
  process.exit(0);
}
run();

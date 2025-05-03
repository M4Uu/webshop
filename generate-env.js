// generate-env.js
const fs = require('fs');
require('dotenv').config();

const apiUrl = process.env.API_URL || 'https://webshop-backend-i8ee.onrender.com/api';

const envContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};`;

fs.writeFileSync('./src/environments/environment.prod.ts', envContent);

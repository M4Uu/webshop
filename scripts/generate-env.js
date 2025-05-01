const fs = require('fs');
require('dotenv').config();

const envContent = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  apiKey: '${process.env.API_KEY}'
};
`;

fs.writeFileSync('../src/environments/environment.prod.ts', envContent);

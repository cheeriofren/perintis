const fs = require('fs');
const path = require('path');

// Baca file .env
const envFile = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envFile, 'utf8');

// Parse variabel environment
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

// Baca file konfigurasi service worker
const configFile = path.join(process.cwd(), 'public', 'firebase-messaging-sw-config.js');
let configContent = fs.readFileSync(configFile, 'utf8');

// Ganti variabel environment
Object.entries(envVars).forEach(([key, value]) => {
  configContent = configContent.replace(key, value);
});

// Tulis kembali file konfigurasi
fs.writeFileSync(configFile, configContent);

console.log('Service worker configuration updated successfully'); 
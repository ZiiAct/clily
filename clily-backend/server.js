const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dns = require('dns'); // 1. Panggil modul DNS bawaan
require('dotenv').config();

// 2. Paksa Node.js untuk memprioritaskan jalur IPv4 yang sudah terbukti jalan di CMD kamu
dns.setDefaultResultOrder('ipv4first');

const { identifyBug } = require('./controllers/identifyController');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/identify-bug', upload.single('image'), identifyBug);

app.listen(port, () => {
    console.log(`🚀 Clily Backend berjalan di http://localhost:${port}`);
});
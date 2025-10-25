import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import Connection from './database/db.js';
import routes from './routes/routes.js';

dotenv.config();

const app = express();

// Required to resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use('/files', express.static(path.join(__dirname, 'uploads'))); // ✅ ADDED

app.use('/', routes); // Routes should come after static middleware

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`✅ Server is running successfully on PORT ${PORT}`));

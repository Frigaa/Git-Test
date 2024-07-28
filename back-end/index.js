import express from 'express';
import requestLogger from './middlewares/requestLogger.js';
import dotenv from 'dotenv';
import api from './api/index.js';
import CONFIG from './config.json' with {type: 'json'};
import mongoose from 'mongoose';

dotenv.config();
const PORT = CONFIG.port || 7000;
const app = express();

// Connect to Database
mongoose.connect(CONFIG.mongo_url)
    .then((db) => {
        app.use(express.json());
        // app.use(requestLogger);
        app.use('/api', api({ config: CONFIG, db }));
        app.listen(
            PORT,
            () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
        );
    })
    .catch((err) => { console.log(err, "Received an Error"); });

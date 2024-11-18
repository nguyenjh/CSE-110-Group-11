////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// server.js
// Code is modified from MongoDB MERN tutorial'
//
// Connects all parts of our server and runs it on port 5050 from config.env
// Assembled by Alex Paz
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute'
import postRoutes from './routes/postRoute'

dotenv.config( {path: './config.env'} );
// console.log(process.env);npm
const PORT = process.env.PORT || 5050 ;
const ATLAS_URI = process.env.ATLAS_URI

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ATLAS_URI) {
    mongoose.connect(ATLAS_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Failed to connect to MongoDB:", error);
        });
} else {
    console.error("MONGODB_URI is not defined in .env");
}

app.use('/recipe', postRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
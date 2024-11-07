import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';

dotenv.config({ path: '/Users/lelezhao/CSE-110-Group-11/.env' });
// console.log(process.env);
const app: Express = express();
const PORT = process.env.PORT ||8080 ;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("MongoDB URI:",MONGODB_URI );

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Failed to connect to MongoDB:", error);
        });
} else {
    console.error("MONGODB_URI is not defined in .env");
}

app.get('/', async(req: Request, res: Response) => {
    // res.send("Welcome to the API! The server is running.");
    const decks = await User.find();
    res.json(decks);

}); 

// Routes example
app.post('/users', async (req: Request, res: Response) => {
    try {
        const user = new User(req.body); 
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
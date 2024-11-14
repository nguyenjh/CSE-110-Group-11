import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import userRoutes from './routes/userRoute';


dotenv.config({ path: '/Users/lelezhao/CSE-110-Group-11/.env' });
// console.log(process.env);
const app: Express = express();
const PORT = process.env.PORT ||8081 ;
const MONGODB_URI = process.env.MONGODB_URI||"mongodb+srv://zhaolelellll:OPHBYrR5qKEe8ptC@cluster0.0cawc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
app.use('/api', userRoutes);

// app.get('/', async(req: Request, res: Response) => {
//     const decks = await User.find();
//     res.json(decks);

// }); 

// Routes example
// app.post('/users', async (req: Request, res: Response) => {
//     try {
//         const user = new User(req.body); 
//         await user.save();
//         res.status(201).send(user);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
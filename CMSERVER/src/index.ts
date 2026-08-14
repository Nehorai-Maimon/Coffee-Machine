import express, {Request,Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// get the vars from env to the server
dotenv.config();

//create the server, listen to PORT || 3000 
const app = express();
const port = process.env.PORT || 3000;

// security and read json
app.use(cors());
app.use(express.json());

// return to every call
app.get('/',(req: Request,res:Response)=>{
    res.send('Coffee Machine Api is running!')
});

//turn on the server
app.listen(port, ()=>{
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
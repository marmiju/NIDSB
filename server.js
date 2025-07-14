import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/Routers.js'; // Import routes

export const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


app.use('/api', router); // Mount the routes

app.get('/', (req, res) => {
    res.send('Welcome to the NIDSB API');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

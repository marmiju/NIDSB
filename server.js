import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './database/DB.js'; // Import the database connection
import router from './routes/Routers.js'; // Import routes

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


app.use('/api', router); // Mount the routes
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

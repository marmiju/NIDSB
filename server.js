import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './database/DB.js'; // Database connection
import router from './routes/routes.js'; // Import routes

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Call the database connection function
db();

app.use('/api', router); // Mount the routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


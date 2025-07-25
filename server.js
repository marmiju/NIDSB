const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/Routers'); // No .js extension needed in CommonJS

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use('/api', router); // Mount the routes

app.get('/', (req, res) => {
    res.send('Welcome to the NIDS API');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// No `export default` in CommonJS, only needed if used in another module
module.exports = app;






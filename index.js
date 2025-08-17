const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const connectDB = require('./config/DB');


dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



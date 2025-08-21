const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Configuration
const connectDB = require('./configs/db.config');

// Routes
const authRoutes = require('./routes/auth.route');
const profileRoutes = require('./routes/profile.route')

dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));





connectDB();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
});
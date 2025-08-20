const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configs/db.config');
const authRoutes = require('./routes/auth.route');


dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
});
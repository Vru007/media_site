const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


const authRouter = require("./routes/auth");
const mediaRouter = require("./routes/media");

const app = express();
const port = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', authRouter);
app.use('/api/media', mediaRouter);

app.use(express.static(path.join(__dirname, "dist")));





app.get('*', (req, res, next) => {

    if (req.path.startsWith('/api')) {
        next();
        return;
    }
    
    
    if (req.path.includes('.')) {
        next();
        return;
    }

    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB connected Successfully");
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error in DB connection:", err);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error',
        message: 'Something broke!'
    });
});
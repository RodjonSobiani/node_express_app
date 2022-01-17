const express = require('express');
const mongoose = require('mongoose');
const models = require('./app/models');
const config = require('./config');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const {appPort, mongoUriLocal, mongoUriAtlas} = config.app;
config.api(app);

app.use(indexRoutes);
app.use(authRoutes);
app.use(usersRoutes);

app.use(cors())
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(cookieParser());

// Подключение к локальной БД или к Atlas
const mongoUri = mongoUriLocal;
// const mongoUri = mongoUriAtlas;

// Старт сервера
const start = async () => {
    try {
        await mongoose.connect(mongoUri);
        let dbPlace;
        if (mongoUri === mongoUriAtlas) {
            dbPlace = 'Atlas';
        }
        if (mongoUri === mongoUriLocal) {
            dbPlace = 'Local';
        }
        app.listen(
            appPort,
            () => console.log(`MongoDB has been connected on ${dbPlace}!`)
        )
        console.log(`Server has been launched on: http://localhost:${appPort}`);
    } catch (e) {
        console.log('Server error:', e.message);
        process.exit(1);
    }
};

start();
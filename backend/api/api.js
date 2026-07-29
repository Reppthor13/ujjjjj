const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/osszes', async (request, response) => {
    console.log("szia");
    try {
        const osszes = await database.osszes();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: osszes
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/coffees', async (request, response) => {
    console.log("szia2");
    try {
        const coffees = await database.coffees();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: coffees
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});


router.post('/coffeesPost', async (request, response) => {
    console.log("szia3");
    try {
        const { nev, ar, bab_szarmazasi_orszag, bab_gyartasi_orszag } = request.body;
        response.status(200).json({
            message: 'Ez a végpont működik.'
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/countriesByBean', async (request, response) => {
    console.log("szia4");
    try {
        const countriesByBean = await database.countriesByBean();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: countriesByBean
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});


router.get('/coffees-by-country/:country_id', async (request, response) => {
    console.log("szia5");
    try {
        const coffeesByCountry = await database.coffeesByCountry();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: coffeesByCountry
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});


module.exports = router;

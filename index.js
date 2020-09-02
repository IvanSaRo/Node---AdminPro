const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();


const { dbConnection } = require('./db/config');

dbConnection();






app.get('/', (req, res) => {

    res.json({
        ok: true, 
        msg: 'Hola'
    })
})


app.listen( process.env.PORT, () => {
    console.log( "Corriendo en puerto " + process.env.PORT)
} )
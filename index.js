const express = require('express');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const app = express();
// 
// mean_user

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
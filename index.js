const express = require('express');
const { dbConnection } = require('./db/config');

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


app.listen( 3000, () => {
    console.log( "Corriendo en puerto 3000")
} )
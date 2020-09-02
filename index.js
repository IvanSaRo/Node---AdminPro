require('dotenv').config();

const express = require('express');
const cors = require('cors');



const app = express();

const { dbConnection } = require('./db/config');

app.use(cors());


dbConnection();



//


app.get('/', (req, res) => {

    res.json({
        ok: true, 
        msg: 'Hola'
    })
})


app.listen( process.env.PORT, () => {
    console.log( "Corriendo en puerto " + process.env.PORT)
} )
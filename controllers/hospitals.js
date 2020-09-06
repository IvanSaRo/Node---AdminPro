const { response } = require("express"); 



const getHospitals = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getHospitals'
    });

}

const createHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'createHospitals'
    });

}

const deleteHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteHospitals'
    });

}

const putHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'putHospitals'
    });

}

module.exports = { 
    getHospitals,
    createHospital,
    deleteHospital,
    putHospital
}
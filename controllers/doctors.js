const { response } = require("express"); 



const getDoctors = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getDoctors'
    });

}

const createDoctor = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'createDoctor'
    });

}

const deleteDoctor = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteDoctor'
    });

}

const putDoctor = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'putDoctor'
    });

}

module.exports = { 
    getDoctors,
    createDoctor,
    deleteDoctor,
    putDoctor
}
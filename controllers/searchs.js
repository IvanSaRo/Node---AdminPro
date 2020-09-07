// getGeneral

const { response } = require("express");

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getGeneral = async(req, res = response) => {

    const query = req.params.searchs;
    const regex = new RegExp( query, 'i')
    
    

    const [users, doctors, hospitals] = await Promise.all([
         User.find({ name: regex }),
         Doctor.find({ name: regex }),
         Hospital.find({ name: regex })
    ])
    
        res.json({
        ok:true,
        users,
        doctors,
        hospitals
    })

}

module.exports = {
    getGeneral
}
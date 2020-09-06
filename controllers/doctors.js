const { response } = require("express"); 

const Doctor = require('../models/doctor');



const getDoctors = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getDoctors'
    });

}

const createDoctor = async(req, res = response) => {

    const uid = req.uid;
    const doctor = new Doctor({
    user: uid,
    ...req.body,
  });

  try {
    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

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
const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospitals = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitals",
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({//desestructuramos para añadir el id de quien ha creado el hospital en la DB
    user: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.json(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteHospitals",
  });
};

const putHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "putHospitals",
  });
};

module.exports = {
  getHospitals,
  createHospital,
  deleteHospital,
  putHospital,
};

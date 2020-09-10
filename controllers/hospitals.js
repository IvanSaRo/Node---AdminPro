const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name");

  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    //desestructuramos para añadir el id de quien ha creado el hospital en la DB
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

const putHospital = async (req, res = response) => {
  try {
    const id = req.params.id;
    const uid = req.uid;

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    const hospitalChanges = {
      ...req.body,
      user: uid,
    };

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      hospitalChanges,
      { new: true }
    );
    res.json({
      ok: true,
      updatedHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  try {
    const id = req.params.id;

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital borrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
module.exports = {
  getHospitals,
  createHospital,
  deleteHospital,
  putHospital,
};

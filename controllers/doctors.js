const { response } = require("express");

const Doctor = require("../models/doctor");

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("user", "name")
    .populate("hospital", "name");

  res.json({
    ok: true,
    doctors,
  });
};

const getDoctorById = async (req, res = response) => {
  try {
    const id = req.params.id;

    const doctor = await Doctor.findById(id)
      .populate("user", "name")
      .populate("hospital", "name");

    res.json({
      ok: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
};
const createDoctor = async (req, res = response) => {
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
};

const putDoctor = async (req, res = response) => {
  try {
    const id = req.params.id;
    const uid = req.uid;

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor no encontrado",
      });
    }

    const doctorChanges = {
      ...req.body,
      user: uid,
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorChanges, {
      new: true,
    });
    res.json({
      ok: true,
      updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};
const deleteDoctor = async (req, res = response) => {
  try {
    const id = req.params.id;

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor no encontrado",
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Doctor borrado",
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
  getDoctors,
  createDoctor,
  deleteDoctor,
  putDoctor,
  getDoctorById,
};

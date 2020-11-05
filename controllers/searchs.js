const { response } = require("express");

const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const getGeneral = async (req, res = response) => {
  const query = req.params.search;
  const regex = new RegExp(query, "i");

  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Doctor.find({ name: regex }),
    Hospital.find({ name: regex }),
  ]);
  //  { $text: { name: regex, $diacriticSensitive: true } }
  res.json({
    ok: true,
    users,
    doctors,
    hospitals,
  });
};

const getFromTable = async (req, res = response) => {
  const query = req.params.search;
  const table = req.params.table;
  const regex = new RegExp(query, "i");

  let data = [];

  switch (table) {
    case "users":
      data = await User.find({ name: regex });
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Error al encontrar la tabla",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  getGeneral,
  getFromTable,
};

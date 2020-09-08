const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const fs = require("fs");

const updateImg = async (table, id, archiveName) => {
  console.log(table, id, archiveName);
  switch (table) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("No se encontró ningún doctor");
        return false;
      }
      // Ver si hay img anterior
      const oldPath = `./uploads/doctors/${doctor.img}`;
      if (fs.existsSync(oldPath)) {
        // borrar la img anterior en la carpeta
        fs.unlinkSync(oldPath);
      }

      doctor.img = archiveName;
      await doctor.save();
      return true;
    case "hospitals":
      break;
    case "users":
      break;

    default:
      break;
  }
};

module.exports = {
  updateImg,
};

const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const fs = require("fs");
const hospital = require("../models/hospital");

const deleteImg = (path) => {
  // Ver si hay img anterior
  if (fs.existsSync(path)) {
    // borrar la img anterior en la carpeta
    fs.unlinkSync(path);
  }
};

const updateImg = async (table, id, archiveName) => {
  let oldPath = "";

  switch (table) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("No se encontró ningún doctor");
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImg(oldPath);

      doctor.img = archiveName;
      await doctor.save();
      return true;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No se encontró ningún hospital");
        return false;
      }

      oldPath = `./uploads/doctors/${hospital.img}`;
      deleteImg(oldPath);

      hospital.img = archiveName;
      await hospital.save();
      return true;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("No se encontró ningún user");
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteImg(oldPath);

      user.img = archiveName;
      await user.save();
      return true;

    default:
      break;
  }
};

module.exports = {
  updateImg,
};

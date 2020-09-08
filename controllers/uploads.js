const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (req, res = response) => {
  const table = req.params.table;
  const id = req.params.id;
  // Validamos que la tabla que vaya en params sea una de las indexadas
  const validTables = ["users", "doctors", "hospitals"];
  if (!validTables.includes(table)) {
    return res.status(400).json({
      ok: false,
      msg: "Tabla errónea",
    });
  }
  // Validamos que se haya cargado un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No se agregó ningún archivo",
    });
  }

  // Procesar imagen

  const file = req.files.img;

  const extensionName = file.name.split(".");

  const archiveExtension = extensionName[extensionName.length - 1];

  // Validar extensión

  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(archiveExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "La extensión del archivo no está permitida",
    });
  }

  // Generar el nombre del archivo

  const archiveName = `${uuidv4()}.${archiveExtension}`;

  // Path para crear la imagen

  const path = `./uploads/${table}/${archiveName}`;

  // Mover la imagen a la carpeta adecuada

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al cargar la imagen",
      });
    }

    res.json({
      ok: true,
      archiveName,
      msg: "Archivo subido",
    });
  });
};

module.exports = {
  fileUpload,
};

const { response } = require("express");


const fileUpload = ( req, res = response) => {

  const table = req.params.table;
  const id    = req.params.id;
    // Validamos que la tabla que vaya en params sea una de las indexadas
  const validTables = ['users', 'doctors', 'hospitals'];
  if( !validTables.includes( table )){
      return res.status(400).json({
          ok: false,
          msg: 'Tabla errónea'
      });
  }
    // Validamos que se haya cargado un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
        ok: false,
        msg: 'No se agregó ningún archivo'
    });
  }

    // Procesar imagen



    res.json({
        ok: true,
        msg: 'fileUploaded'
    });
}

module.exports = {

    fileUpload
}
const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
      type: Schema.Types.ObjectId,//le decimos a mongoose que este esquema está relacionado con Usuario meidante el type y al ref
      ref: 'Usuario'
  }
}, {collection: 'hospitales'});//con esto damos el nombre a la tabla de hospitales en la DB

HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", HospitalSchema);

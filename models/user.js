const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method("toJSON", function () {
  //MODIFICA EL ASPECTO VISUAL COMO PUEDE HACERLO UN pipe(map(...)) EN EL FRONT, NO MODIFICA BD
  //separamos del objeto tanto la propiedad __V como _id, entregaría un objeto con todas las prop menos __v y _id
  //quitamos password del objeto para no retornan el password
  const { __v, _id, password, ...object } = this.toObject();
  //creamos una nueva propiedad en el objeto y le cargamos _id(así nos lo da MongoDB por defecto)
  object.uid = _id;
  // devolvemos el obj sin __v y con _id como uid
  return object;
});

module.exports = model("Usuario", UserSchema);

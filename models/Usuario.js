const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({

nombre: String,

correo: {
type: String,
unique: true
},

password: String,

pais: String,

idioma: String,

nacimiento: String

});

module.exports = mongoose.model("Usuario", usuarioSchema);
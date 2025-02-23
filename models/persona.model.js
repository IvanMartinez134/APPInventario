const mongoose = require('mongoose');

const PersonaSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    fechaNacimiento: {type: Date, require: true},
    rfc: {type: String, require: true, unique: true},
    correo: {type: String, require: true, unique: true}
})

module.exports = mongoose.model('Persona', PersonaSchema);

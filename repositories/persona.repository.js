const Persona = require('../models/persona.model')

class PersonaRepository{
    async getAllPersonas(){
        return await Persona.find();
    }

    async getPersonaById(id){
        return await Persona.findById(id);
    }

    async getPersnaByRFC(rfc){
        return await Persona.findOne({rfc: rfc});
    }

    async getPersonaByCorreo(correo){
        return await Persona.findOne({correo: correo});
    }


    async createPersona(persona){
        return await Persona.create(persona);
    }

    async updatePersona(id, persona){
        return await Persona.findByIdAndUpdate(id, persona, {new: true});
    }

    async deletePersona(id){
        return await Persona.findByIdAndDelete(id);
    }

    async getPersonaByRFCAndNotId(id, rfc){
        return await Persona.findOne({_id: {$ne:id, rfc: rfc}})
    }

    async getPersonaByCorreoAndNotId(id, correo){
        return await Persona.findOne({_id: {$ne:id, correo: correo}})
    }
}

module.exports = new PersonaRepository();


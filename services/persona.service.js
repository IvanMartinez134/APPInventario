const PersonaRepository = require('../repositories/persona.repository')
const Validaciones = require('../utils/validation')
const Utils = require('../utils/utils');
const validation = require('../utils/validation');

class PersonaService{
    async getAllPersonas(){
        return await PersonaRepository.getAllPersonas();
    }

    async getPersonaById(id){
        const persona = await PersonaRepository.getPersonaById(id);
        if (!persona) {
            throw new Error("Persona no encontrada");
        }
        return persona;
    }

    async CreatePersona(persona){
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error("Todos los campos son requeridos");
        }

        Validaciones.validarRFC(persona.rfc)

        Validaciones.validarCorreo(persona.correo)

        const personaByRFC = await PersonaRepository.getPersnaByRFC(persona.rfc)

        const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo)

        if (personaByRFC) {
            throw new Error("El RFC ya existe");
        }

        
        if (personaByCorreo) {
            throw new Error("El correo ya existe");
        }

        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error("La persona debe ser mayor de edad");
        }

        return await PersonaRepository.createPersona(persona); 
    }

    async updatePersona(id, persona){

        const personaById = await PersonaRepository.getPersonaById(id)
        if (!personaById) {
            throw new Error("Persona no existe");
            
        }

        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error("Todos los campos son requeridos");
        }

        Validaciones.validarRFC(persona.rfc)

        Validaciones.validarCorreo(persona.correo)

        const personaByRFCNotId = await PersonaRepository.getPersonaByRFCAndNotId(id, persona.rfc)
        if (personaByRFCNotId) {
            throw new Error("El RFC ya existe");
        }

        const personaByCorreoAndNotId = await PersonaRepository.getPersonaByCorreoAndNotId(id, persona.rfc)
        if (personaByCorreoAndNotId) {
            throw new Error("El Correo ya existe");   
        }

        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error("La persona debe ser mayor de edad");
        }
        
    }

    async deletePersona(id) {
        try {
            if (!id) {
                throw new Error("El ID de la persona es requerido");
            }
            const persona = await PersonaRepository.getPersonaById(id);
            if (!persona) {
                throw new Error("Persona no encontrada");
            }
            const result = await PersonaRepository.deletePersona(id);
            return { success: true, message: "Persona eliminada correctamente", data: result };
        } catch (error) {
            throw new Error(`Error al eliminar la persona: ${error.message}`);
        }
    }

   

}

module.exports = new PersonaService();
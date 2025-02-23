const PersonaService = require('../services/persona.service')

class PersonaController{
   async getAllPersonas(req, res){
        try{
            const personas = await PersonaService.getAllPersonas()
            res.status(200).json(personas)
        }catch(error){
            res.status(400).json({message: console.message})
            
        }
    }

    async getPersonaById(req, res){
        try {
            const personaId = req.params.id;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error("El id de la persona es requerido");
            }
            const persona = await PersonaService.getPersonaById(personaId);
            res.json(persona);
        } catch (error) {
            res.status(400).json({message: console.message})
        }
    }

    async CreatePersona(req, res){
        try {
            const persona = await PersonaService.CreatePersona(req.body);
            res.json(persona);
        } catch (error) {
            res.status(400).json({message: console.message})
        }
    }

    async updatePersona(req, res){
        try {
            const personaId = req.params.id;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error("El id de la persona es requerido");
                
            }
            const persona = await PersonaService.updatePersona(personaId, req.body)
            res.json(persona)
        } catch (error) {
            res.status(400).json({message: console.message}) 
        }
    }

    async deletePersona(req, res) {
        try {
            const personaId = req.params.id;
            const result = await PersonaService.deletePersona(personaId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    
}

module.exports = new PersonaController();
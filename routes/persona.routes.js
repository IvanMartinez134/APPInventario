const express = require('express');
const PersonaController = require('../controllers/persona.controller');
const router = express.Router();

router.get('/', PersonaController.getAllPersonas);

router.get('/id/:id', PersonaController.getPersonaById)
router.post('/',PersonaController.CreatePersona)
router.get('/:id', PersonaController.updatePersona)
router.delete('/:id',PersonaController.deletePersona)

module.exports = router;

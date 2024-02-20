const express = require('express');
const upload = require('../middlewares/upload');
const authenticateJWT = require('../middlewares/authenticateJWT.js');

const router = express.Router();

const PetsController = require('../controllers/petsController');
console.log("Type of authenticateJWT: ", typeof authenticateJWT);

router.get('/', PetsController.getAllPets);
router.get('/userpets', authenticateJWT ,PetsController.getPetsByUserID);
router.post('/', upload.single('petImage'), PetsController.addPet);
router.delete('/:id', PetsController.deletePet);

router.post('/adopt', authenticateJWT, PetsController.adoptPet);
router.post('/foster', authenticateJWT, PetsController.fosterPet);
router.post('/abandon', authenticateJWT, PetsController.abandonPet);
router.delete('/:id', PetsController.deletePet);
router.patch('/edit/:id', upload.single('petImage'), PetsController.editPet);



module.exports = router;

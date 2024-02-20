const express = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT.js');

const router = express.Router();

const UsersController = require('../controllers/usersController');
const { default: knex } = require('knex');

router.post('/favorites', authenticateJWT, UsersController.addFavoritePet);

router.get('/favorites', authenticateJWT, UsersController.getFavoritePets);

router.get('/', UsersController.getAllUsers);

router.post('/', UsersController.addUser);

router.delete('/favorites', authenticateJWT, UsersController.removeFavoritePet);

router.delete('/:id', authenticateJWT, UsersController.deleteUser);

router.post('/login',  UsersController.loginUser)

router.get('/details', authenticateJWT, UsersController.getUserDetails);

router.patch('/profile', authenticateJWT, UsersController.updateUserProfile);


router.get('/', UsersController.getAllUsers);




module.exports = router;


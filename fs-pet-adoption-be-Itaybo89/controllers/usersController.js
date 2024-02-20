const { getAllUsersModel, addUserModel, deleteUserModel, getUserByEmail, getUserDetailsModel, updateUserProfileModel, addFavoritePetModel, removeFavoritePetModel, getFavoritePetsModel } = require('../models/usersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const removeFavoritePet = async (req, res) => {
    try {
        console.log('remove');
        const userID = req.user.userID;
        const { petID } = req.body;
        console.log(userID, petID);

        const removed = await removeFavoritePetModel(petID, userID);

        if (removed) {
            res.send({ ok: true });
        }
        else {
            res.send({ ok: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

async function getAllUsers(req, res) {
    try {
        const allUsers = await getAllUsersModel();
        res.send(allUsers);
    } catch (err) {
        res.status(500).send("getting Users to webServer, sad");
    }
}

async function loginUser(req, res) {
    try {
        const user = await getUserByEmail(req.body.email);

        if (!user) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const token = jwt.sign(
            { userID: user.id, email: user.email },
            secretKey,
            { expiresIn: '30d' }
        );

        res.cookie('token', token, { httpOnly: true })
            .status(200)
            .send('Login successful');

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function addUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Email or password is missing');
            res.status(400).send('Email and password are required');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUserDetails = {
            email,
            password: hashedPassword,
            role: 'user',
        };

        const newUser = await addUserModel(newUserDetails);

        res.status(201).send('Added user, backend');
    } catch (err) {
        console.log(err, 'Failed to add user, backend');
        res.status(500).send('Failed to add user, backend');
    }
}

async function deleteUser(req, res) {
    try {
        const deletedUser = await deleteUserModel(req.params.id);
        res.send(deletedUser);
        if (deletedUser) {
            res.send({ ok: true });
        }
        else {
            res.send({ ok: false });
        }
    }
    catch (err) {
        res.status(500).send("delted User with web, sad");
    }
}

const getUserDetails = async (req, res) => {
    try {
        const userID = req.user.userID;

        const userDetails = await getUserDetailsModel(userID);

        if (userDetails) {
            res.status(200).json(userDetails);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.log('Error in getUserDetails:', error);
        res.status(500).send('Internal Server Error');
    }
};

async function updateUserProfile(req, res) {
    try {
        const userEmail = req.user.email;
        const { first_name, last_name, phone_number, short_bio } = req.body;

        const updatedUserDetails = {
            first_name,
            last_name,
            phone_number,
            short_bio
        };

        const updatedUser = await updateUserProfileModel(userEmail, updatedUserDetails);

        if (updatedUser) {
            res.status(200).send('User profile updated');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update user profile');
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await getAllUsersModel();
        res.send(allUsers);
    } catch (err) {
        res.status(500).send("Error fetching users from web server.");
    }
}

const addFavoritePet = async (req, res) => {
    try {
        const userID = req.user.userID;
        const { petID } = req.body;
        console.log(userID, petID);

        const added = await addFavoritePetModel(petID, userID);

        if (added) {
            res.status(200).json({ message: "Successfully added to favorites" });
        } else {
            res.status(500).json({ message: "Failed to add to favorites" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getFavoritePets = async (req, res) => {
    try {
      const userID = req.user.userID;  
      const favorites = await getFavoritePetsModel(userID);  
      res.status(200).json(favorites); 
      console.log(favorites, 'favorites sent back');
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };




module.exports = { getAllUsers, addUser, deleteUser, loginUser, getUserDetails, updateUserProfile, addFavoritePet, removeFavoritePet, getFavoritePets  };
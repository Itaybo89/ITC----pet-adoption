const path = require('path');
const fs = require('fs');
const { getAllPetsModel, addPetModel, deletePetModel, fosterPetModel, adoptPetModel, abandonPetModel, editPetModel, getPetsByUserIDModel } = require('../models/petsModel');

async function getAllPets(req, res) {
    try {
        const allPets = await getAllPetsModel();
        res.send(allPets);
    } catch (err) {
        res.status(500).send("getting pet to webServer, sad");
    }
}

async function getPetsByUserID(req, res) {
    try {
        const userID = req.user.userID;
        console.log("woooow", req.user.userID);
        const filteredPets = await getPetsByUserIDModel(userID);
        res.send(filteredPets);
    } catch (err) {
        res.status(500).send("getting pet by userID to webServer, sad");
    }
}

async function addPet(req, res) {
    try {
        const {
            pet_name,
            age,
            type,
            adoption_status,
            height,
            weight,
            text,
            color,
            hypoallergenic,
            dietary_restrictions,
            breed,
        } = req.body;

        const imgPath = req.file ? `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/uploads/${req.file.filename}` : null;

        if (!imgPath) {
            console.log('Image data is null');
            res.status(400).send('Image is required');
            return;
        }

        const newPet = await addPetModel({
            pet_name,
            age,
            type,
            adoption_status,
            height,
            weight,
            text,
            color,
            hypoallergenic,
            dietary_restrictions,
            breed,
            image_path: imgPath,
            userID: '1',
        });

        res.status(201).json({ message: 'Pet added successfully', pet: newPet });
    } catch (error) {
        console.log('Failed to add pet via server', error);
        res.status(500).send('Internal server error');
    }
}

async function editPet(req, res) {
    try {
        const { id } = req.params;
        const {
            pet_name,
            age,
            type,
            adoption_status,
            height,
            weight,
            text,
            color, 
            hypoallergenic, 
            dietary_restrictions, 
            breed, 
        } = req.body;

        const imgPath = req.file ? `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/uploads/${req.file.filename}` : null;

        const updatedPetDetails = {
            pet_name,
            age,
            type,
            adoption_status,
            height,
            weight,
            text,
            color, 
            hypoallergenic,
            dietary_restrictions,
            breed,
        };

        if (imgPath) {
            updatedPetDetails.image_path = imgPath;
        }

        const updatedPet = await editPetModel(id, updatedPetDetails);

        if (updatedPet) {
            res.status(200).send('Updated pet, backend');
        } else {
            res.status(404).send('Pet not found');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update pet, backend');
    }
}

async function deletePet(req, res) {
    try {
        const deletedPet = await deletePetModel(req.params.id);

        if (deletedPet) {
            res.status(200).send({ ok: true });
        } else {
            res.status(400).send({ ok: false });
        }
    } catch (err) {
        res.status(500).send("deleted pet with web, sad");
    }
}

async function fosterPet(req, res) {
    try {
        const petId = req.body.petId;
        const userId = req.user.userID;
        const result = await fosterPetModel(userId, petId);

        if (result) {
            res.status(200).send({ message: 'Pet fostered successfully' });
        } else {
            res.status(400).send({ message: 'Could not foster pet' });
        }
    } catch (err) {
        res.status(500).send('Error fostering pet');
    }
}

async function adoptPet(req, res) {
    try {
        const petId = req.body.petId;
        const userId = req.user.userID;
        // console.log("User details from middleware: ", req.user);
        // console.log("User ID in adoptPet:", userId);  
        // console.log("Pet ID in adoptPet:", petId);    

        const result = await adoptPetModel(userId, petId);

        if (result) {
            res.status(200).send({ message: 'Pet adopted successfully' });
        } else {
            res.status(400).send({ message: 'Could not adopt pet' });
        }
    } catch (err) {
        res.status(500).send('Error adopting pet');
    }
}

async function abandonPet(req, res) {
    try {
        const petId = req.body.petId;
        const userId = req.user.userID;
        const result = await abandonPetModel(userId, petId);

        if (result) {
            res.status(200).send({ message: 'Pet abandoned successfully' });
        } else {
            res.status(400).send({ message: 'Could not abandon pet' });
        }
    } catch (err) {
        res.status(500).send('Error abandoning pet');
    }
}

module.exports = { getAllPets, addPet, deletePet, fosterPet, adoptPet, abandonPet, editPet, getPetsByUserID };

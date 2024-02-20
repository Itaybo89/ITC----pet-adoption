const dbConnection = require('../knex/knex');


async function getAllPetsModel() {
    try {
        const allPets = await dbConnection.from('pets');
        return allPets;

    } catch (err) {
        console.log(err, "talking to db about pets");
    }
}

async function getPetsByUserIDModel(userID) {
    try {
        const filteredPets = await dbConnection.from('pets').where('userID', userID);
        return filteredPets;
    } catch (err) {
        console.log(err, "talking to db about pets by userID");
    }
}

async function addPetModel(newPet) {
    try {
        const [id] = await dbConnection('pets').insert(newPet);
        newPet.id = id;
        return newPet;
    } catch (err) {
        console.log(err, "trying to add a pet to the db");
    }
}

async function deletePetModel(petId) {
    try {
        const petDeleted = await dbConnection('pets').where({petID: petId}).del();
        return petDeleted;
    }
    catch (err) {
        console.log(err, "error deleting pet from db");
        throw err;
    }
}

async function fosterPetModel(userId, petId) {
    try {
        await dbConnection('pets')
            .where({ petID: petId })
            .update({
                userID: userId,  
                adoption_status: 'Fostered'
            });
        return true;
    } catch (err) {
        console.log("Error while fostering pet:", err);
        throw err;
    }
}

async function adoptPetModel(userId, petId) {
    try {
        // console.log("User ID:", userId);  
        // console.log("Pet ID:", petId);    
        await dbConnection('pets')
            .where({ petID: petId })
            .update({
                userID: userId,  
                adoption_status: 'Adopted'
            });
        return true;
    } catch (err) {
        console.log("Error while adopting pet:", err);
        throw err;
    }
}

async function abandonPetModel(userId, petId) {
    try {
        await dbConnection('pets')
            .where({ petID: petId, userID: userId })  
            .update({
                userID: '1', 
                adoption_status: 'In Stock'  
            });
        return true;
    } catch (err) {
        console.log("Error while abandoning pet:", err);
        throw err;
    }
}

async function editPetModel(id, updatedPetDetails) {
    try {
        const affectedRows = await dbConnection('pets')
            .where({ petID: id })
            .update(updatedPetDetails);       
        return affectedRows >= 1;

    } catch (err) {
        console.log(err, "trying to edit a pet in the db");
        return null;
    }
}




module.exports = { getAllPetsModel, addPetModel, deletePetModel, fosterPetModel, adoptPetModel, abandonPetModel, editPetModel, getPetsByUserIDModel};




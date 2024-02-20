
const dbConnection = require('../knex/knex');

async function getAllUsersModel() {
    try {
        const allUsers = await dbConnection.from('users');
        return allUsers;

    } catch (err) {
        console.log(err, "talking to db about Users");
    }
}

async function addUserModel(newUser) {
    try {
        const [id] = await dbConnection.insert(newUser).into('users');
        newUser.id = id;

    } catch (err) {
        console.log(err, "trying to add a User to the db");
    }
}

async function deleteUserModel(UserId) {
    try {
        const UserDeleted = await dbConnection('users').where({ id: UserId }).del();
        return UserDeleted;
    }
    catch (err) {
        console.log(err, "error deleting User from db");
    }
}

async function getUserByEmail(email) {
    try {
        const user = await dbConnection('users')
            .where({ email: email })
            .first();
        return user;
    } catch (err) {
        console.log('Error fetching user by email:', err);
        throw err;
    }
}

const getUserDetailsModel = async (userID) => {
    try {
        const userDetails = await dbConnection('users')
            .select('email', 'first_name', 'last_name', 'phone_number', 'short_bio', 'role')
            .where({ userID })
            .first();

        return userDetails;
    } catch (error) {
        console.log('Error in getUserDetailsModel:', error);
        return null;
    }
};

async function updateUserProfileModel(email, updatedUserDetails) {
    try {
        const affectedRows = await dbConnection('users')
            .where({ email: email })
            .update(updatedUserDetails);

        return affectedRows >= 1;

    } catch (err) {
        console.log(err, "trying to edit a user profile in the db");
        return null;
    }
}

async function getAllUsersModel() {
    try {
        const allUsers = await dbConnection.from('users');
        return allUsers;
    } catch (err) {
        console.log(err, "Error talking to db about users");
    }
}

async function addFavoritePetModel(petID, userID) {
    try {
        console.log("model");
        await dbConnection('favorites').insert({ petID, userID });
        console.log('checks');
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function removeFavoritePetModel(petID, userID) {
    try {
        console.log('removemodel');
        await dbConnection('favorites')
            .where({ petID, userID })
            .del();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const getFavoritePetsModel = async (userID) => {
    try {
        const results = await dbConnection('favorites')
            .select('petID')
            .where('userID', userID);

        const petIDs = results.map(row => row.petID);

        return petIDs;
    } catch (error) {
        console.error('Error in getFavoritePetsModel:', error);
        throw new Error('Could not fetch favorite pets.');
    }
};


module.exports = { getAllUsersModel, addUserModel, deleteUserModel, getUserByEmail, getUserDetailsModel, updateUserProfileModel, addFavoritePetModel, removeFavoritePetModel, getFavoritePetsModel };
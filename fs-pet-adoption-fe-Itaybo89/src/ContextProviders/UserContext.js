import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { PetContext } from './PetContext';

const UserContext = createContext('');

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { fetchSavedPets, savedPetlist } = useContext(PetContext);
  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (favorites) {
      localStorage.setItem('favorites', JSON.stringify(savedPetlist));
    } else {
      localStorage.removeItem('favorites');
    }
  }, [favorites][savedPetlist]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  const addUser = async (userDetails) => {
    try {
      console.log(userDetails);
      const res = await axios.post('http://localhost:8080/users', userDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('user add via front, happy', res.data);
    } catch (err) {
      console.log('user add via front, sad', err);
    }
  };

  const verifyUser = async (userDetails) => {
    try {
      const endpoint = 'http://localhost:8080/users/login';
      const payload = {
        email: userDetails.email,
        password: userDetails.password,
      };

      const response = await axios.post(endpoint, payload, { withCredentials: true });

      if (response.status === 200) {
        console.log('Login successful');
        const userDetails = await getUserDetails();
        setSelectedUser(userDetails);
        fetchSavedPets();
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/details', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log('Error retrieving user details:', error);
      return null;
    }
  }

  const updateProfile = async (profileDetails) => {
    try {
      await axios.patch('http://localhost:8080/users/profile', profileDetails, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
    } catch (err) {
      console.log("Could not update profile via front", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users');
      setUsers(res.data);
    } catch (err) {
      console.log(err, "could not fetch Users to front");

    }
  };

  const getUserPets = async () => {
    try {
      console.log("testing for me me me");
      const response = await axios.get('http://localhost:8080/allpets/userpets', { withCredentials: true });
      setUserPets(response.data);
      console.log(userPets, "lets test this with a very long distinctive message");
    } catch (error) {
      console.log('Error retrieving user details:', error);
      return null;
    }
  }

  const addFavoritePet = async (petID) => {
    const endpoint = "http://localhost:8080/users/favorites";
    const payload = { petID };

    try {
      const response = await axios.post(endpoint, payload, { withCredentials: true });
      if (response.status === 200) {
        setFavorites([...favorites, petID]);
      }
    } catch (err) {
      console.error("Could not add favorite pet:", err);
    }
  };

  const removeFromFavorites = async (petID) => {
    const endpoint = "http://localhost:8080/users/favorites";
    const payload = { petID };

    try {
      const response = await axios.delete(endpoint, { data: payload, withCredentials: true });
      if (response.status === 200) {
        setFavorites(favorites.filter((id) => id !== petID));
      }
    } catch (err) {
      console.error("Could not remove favorite pet:", err);
    }
  };

  const searchTools = async (searchString) => {
    try {
      const response = await axios.post('http://localhost:8080/tools', {
        searchString: searchString,
      });
      console.log(`Received response: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      console.log(`Error sending request: ${error}`);
      return [];
    }
  };


  const searchAndDestroy = async (searchString) => {
    try {
      const response = await axios.post('http://localhost:8080/search', {
        searchString: searchString,
      });
      console.log(`Received response: ${JSON.stringify(response.data)}`);
      console.log(response.data.filteredPets);
      return response.data.filteredPets;
    } catch (error) {
      console.log(`Error sending request: ${error}`);
      return [];
    }
  };

  return (
    <UserContext.Provider
      value={{
        addUser,
        verifyUser,
        getUserDetails,
        updateProfile,
        fetchUsers,
        selectedUser,
        setSelectedUser,
        users,
        setUsers,
        getUserPets,
        userPets,
        signInModalOpen,
        setSignInModalOpen,
        signUpModalOpen,
        setSignUpModalOpen,
        setFavorites,
        favorites,
        addFavoritePet,
        removeFromFavorites,
        searchAndDestroy,
        searchTools,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserContextProvider;
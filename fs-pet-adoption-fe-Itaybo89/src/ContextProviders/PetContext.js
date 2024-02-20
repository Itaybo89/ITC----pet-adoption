import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from "./UserContext";

const PetContext = createContext("");

const PetContextProvider = ({ children }) => {
  const [allPetsList, setAllPetsList] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [savedPetsList, setSavedPetsList] = useState([]);

  const fetchPet = async () => {
    try {
      const res = await axios.get('http://localhost:8080/allpets');
      setAllPetsList(res.data);
    } catch (err) {
      console.log(err, "could not fetch Pet to front");
    }
  };

  const fetchSavedPets = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users/favorites', { withCredentials: true });
      setSavedPetsList(res.data);

      const allPetsRes = await axios.get('http://localhost:8080/allpets');
      setAllPetsList(allPetsRes.data);
  
      const savedPetsFromAllPetsList = allPetsRes.data.filter(pet => {

        return res.data.includes(pet.petID);
      });
      setSavedPetsList(savedPetsFromAllPetsList);
      localStorage.setItem('savedPetList', JSON.stringify(savedPetsFromAllPetsList));

  
    } catch (err) {
      console.log(err, "could not fetch Saved Pets to front");
    }
  };

  const addPet = async (petDetails, petImage) => {
    try {
      const formData = new FormData();
      Object.keys(petDetails).forEach((key) => {
        formData.append(key, petDetails[key]);
      });
      if (petImage) {
        formData.append('petImage', petImage);
      }
      await axios.post('http://localhost:8080/allpets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err, "could not add pet via front");
    }
  };

  const deletePet = async (petId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/allpets/${petId}`, { withCredentials: true });
      if (res.data.ok) {
        fetchPet();
      }
    } catch (err) {
      console.log(err, "could not delete via front");
    }
  };

  const adoptPet = async (petId) => {
    try {
      await axios.post(`http://localhost:8080/allpets/adopt`, { petId }, { withCredentials: true });
    } catch (err) {
      console.log(err, "could not adopt pet via front");
    }
  };

  const updatePet = async (petDetails, petImage, id) => {
    const formData = new FormData();
    Object.keys(petDetails).forEach(key => {
      formData.append(key, petDetails[key]);
    });
    if (petImage) {
      formData.append('petImage', petImage);
    }

    try {
      await axios.patch(`http://localhost:8080/allpets/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
    } catch (err) {
      console.log("Could not update pet via front", err);
    }
  };

  const fosterPet = async (petId) => {
    try {
      await axios.post(`http://localhost:8080/allpets/foster`, { petId }, { withCredentials: true });
    } catch (err) {
      console.log(err, "could not foster pet via front");
    }
  };

  const abandonPet = async (petId) => {
    try {
      const res = await axios.post(`http://localhost:8080/allpets/abandon`, { petId }, { withCredentials: true });
      if (res.data.ok) {
      }
    } catch (err) {
      console.log(err, "could not abandon pet via front");
    }
  };

  return (
    <PetContext.Provider
      value={{
        allPetsList,
        fetchPet,
        addPet,
        deletePet,
        adoptPet,
        fosterPet,
        abandonPet,
        selectedPet,
        setSelectedPet,
        updatePet,
        fetchSavedPets,
        savedPetsList,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export { PetContext };
export default PetContextProvider;

import React, { useState, useEffect, useContext } from "react";
import CustomModal from "../CustomCard/CustomModal";
import CustomCard from "../CustomCard/CustomCard";
import { PetContext } from "../../ContextProviders/PetContext";
import "./allpetspics.css";

function AllPetsPics() {
  const [open, setOpen] = useState(false);

  const { allPetsList, fetchPet, selectedPet, setSelectedPet } = useContext(PetContext);

  useEffect(() => {
    fetchPet();
  }, []);

  return (
    <div id="allpets-div">
      {allPetsList.map((pet, index) => (
        <CustomCard
          key={index}
          image={pet.image_path}
          name={pet.pet_name}
          onClick={() => {
            setOpen(true);
            setSelectedPet(pet);
          }}
        />
      ))}
      {selectedPet && (
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          pet={selectedPet}
        />
      )}
    </div>
  );
}

export default AllPetsPics;

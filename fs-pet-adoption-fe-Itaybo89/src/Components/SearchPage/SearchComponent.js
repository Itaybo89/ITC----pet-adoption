import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import './searchcomponent.css';
import CustomButton from '../CustomButton/CustomeButton';
import { UserContext } from '../../ContextProviders/UserContext';
import CustomModal from '../CustomCard/CustomModal';
import CustomCard from '../CustomCard/CustomCard'; 

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { searchAndDestroy } = useContext(UserContext);

  const handleSearch = async () => {
    const results = await searchAndDestroy(searchTerm);
    setSearchResults(results);
  };

  const openModal = (pet) => {
    setSelectedPet(pet);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div id='container-div'>
      <div id='text-field'>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          inputProps={{ maxLength: 75 }}
        />
      </div>
      <div id='search-btn'>
        <CustomButton
          onClickFunction={handleSearch}
          buttonText="Search"
          buttonColor="primary"
        />
      </div>
      <div id='results'>
        {searchResults && searchResults.length > 0 && searchResults.map((result, index) => (
          <CustomCard
            key={index}
            onClick={() => openModal(result)}
            image={result.image_path}
            name={result.pet_name}
            info={result.type}
          />
        ))}
      </div>
      {selectedPet && (
        <CustomModal open={open} onClose={closeModal} pet={selectedPet} />
      )}
    </div>
  );
};

export default SearchComponent;

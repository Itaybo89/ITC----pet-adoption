import React, { useState, useContext } from 'react';
import { TextField, Container, Typography } from '@mui/material';
import { PetContext } from '../../ContextProviders/PetContext';
import './addpetform.css';
import CustomButton from '../CustomButton/CustomeButton';

const AddPetForm = () => {
  const [petDetails, setPetDetails] = useState({
    pet_name: '',
    age: '',
    type: '',
    adoption_status: '',
    height: '',
    weight: '',
    text: '',
    image_path: '',
    color: '',
    hypoallergenic: '',
    dietary_restrictions: '',
    breed: '',
  });

  const [petImage, setPetImage] = useState(null);
  const { addPet } = useContext(PetContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setPetImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(petDetails, petImage);
      setPetDetails({
        pet_name: '',
        age: '',
        type: '',
        adoption_status: '',
        height: '',
        weight: '',
        text: '',
        image_path: '',
        color: '',
        hypoallergenic: '',
        dietary_restrictions: '',
        breed: '',
      });
      setPetImage(null);
    } catch (err) {
      console.log('Failed to add pet via front-end', err);
    }
  };

  return (
    <div id="container-add-pet">
      <div id='form-box'>
        <Container className="form-container">
          <Typography variant="h4">Add a Pet</Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-columns">
            <div className="form-column">
              <TextField label="Pet Name" name="pet_name" variant="outlined" value={petDetails.pet_name} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Age" name="age" variant="outlined" value={petDetails.age} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Type" name="type" variant="outlined" value={petDetails.type} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Height" name="height" variant="outlined" value={petDetails.height} onChange={handleChange} fullWidth margin="normal" required />
              <TextField label="Weight" name="weight" variant="outlined" value={petDetails.weight} onChange={handleChange} fullWidth margin="normal" required />
              <div className="form-button-left">
                <input type="file" name="petImage" accept="image/*" onChange={handleImageChange} required />
              </div>
            </div>
            <div className="form-column">
              <TextField label="Color" name="color" variant="outlined" value={petDetails.color} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Hypoallergenic" name="hypoallergenic" variant="outlined" value={petDetails.hypoallergenic} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Dietary Restrictions" name="dietary_restrictions" variant="outlined" value={petDetails.dietary_restrictions} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Breed" name="breed" variant="outlined" value={petDetails.breed} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Text" name="text" variant="outlined" value={petDetails.text} onChange={handleChange} fullWidth margin="normal" required />
              <div className="form-button-right">
                <CustomButton color="primary" variant="contained" buttonText="Add Pet" buttonType="submit" />
              </div>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AddPetForm;

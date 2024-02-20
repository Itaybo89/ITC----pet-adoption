import React, { useState, useContext, useEffect } from 'react';
import { TextField, Container, Typography, Button } from '@mui/material';
import { PetContext } from '../../ContextProviders/PetContext';
import { useNavigate, useParams } from 'react-router-dom';
import './editpet.css';

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPet, setSelectedPet, updatePet } = useContext(PetContext);
  const storedPet = JSON.parse(localStorage.getItem('selectedPet')) || selectedPet;

  const [petDetails, setPetDetails] = useState({
    pet_name: storedPet.pet_name,
    age: storedPet.age,
    type: storedPet.type,
    adoption_status: storedPet.adoption_status,
    height: storedPet.height,
    weight: storedPet.weight,
    text: storedPet.text,
    image_path: storedPet.image_path,
    color: '', 
    hypoallergenic: '',
    dietary_restrictions: '', 
    breed: '', 
  });

  const [petImage, setPetImage] = useState(null);

  useEffect(() => {
    if (selectedPet) { 
      localStorage.setItem('selectedPet', JSON.stringify(selectedPet));
      setPetDetails(selectedPet);
    }
  }, [selectedPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setPetImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePet(petDetails, petImage, id);
    } catch (err) {
      console.log('Failed to update pet via front-end', err);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('selectedPet');
    navigate('/');
  };

  return (
    <div id="container-edit-pet">
      <Container id="form-box">
        <Typography id="edit-title" variant="h4">Edit Pet</Typography>
        <div className="form-container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-columns">
              <div className="form-column">
                <TextField label="Pet Name" name="pet_name" variant="outlined" value={petDetails.pet_name} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Age" name="age" variant="outlined" value={petDetails.age} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Type" name="type" variant="outlined" value={petDetails.type} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Height" name="height" variant="outlined" value={petDetails.height} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Weight" name="weight" variant="outlined" value={petDetails.weight} onChange={handleChange} fullWidth margin="normal" required />
              </div>
              <div className="form-column">
                <TextField label="Color" name="color" variant="outlined" value={petDetails.color} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Hypoallergenic" name="hypoallergenic" variant="outlined" value={petDetails.hypoallergenic} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Dietary Restrictions" name="dietary_restrictions" variant="outlined" value={petDetails.dietary_restrictions} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Breed" name="breed" variant="outlined" value={petDetails.breed} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Text" name="text" variant="outlined" value={petDetails.text} onChange={handleChange} fullWidth margin="normal" required />

                <input type="file" name="petImage" accept="image/*" onChange={handleImageChange} required />
              </div>
            </div>
            <div className="form-columns">
              <Button className="form-button-left" variant="outlined" color="primary" type="submit">Save</Button>
              <Button className="form-button-right" variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EditPet;

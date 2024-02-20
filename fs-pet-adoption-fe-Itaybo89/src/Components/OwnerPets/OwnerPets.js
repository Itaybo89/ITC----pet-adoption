import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import { useContext, useState, useEffect } from 'react';
import './ownerpets.css';
import { PetContext } from '../../ContextProviders/PetContext';
import CustomModal from '../CustomCard/CustomModal';
import { useLocation } from 'react-router-dom';

function OwnerPets() {
    const { allPetsList, fetchPet, selectedPet, setSelectedPet } = useContext(PetContext);
    const [open, setOpen] = useState(false);
    const [filteredPets, setFilteredPets] = useState([]);
    const location = useLocation();
    const user = location.state?.user;

    useEffect(() => {
        fetchPet();
    }, []);

    useEffect(() => {
        setFilteredPets(allPetsList.filter(pet => pet.userID === user.userID));
    }, [allPetsList, user.userID]); 

    const handleClickOpen = (pet) => {
        setSelectedPet(pet);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="pet-container">
            <h1 className="pet-title">{`${user.first_name} ${user.last_name}'s Pets`}</h1>  
            <List className="pet-list">
                {filteredPets.map((pet, index) => (  
                    <ListItem className="pet-item" disablePadding key={index}>
                        <ListItemButton className="pet-button" onClick={() => handleClickOpen(pet)}>
                            <ListItemText className="pet-text" primary={`${pet.pet_name}`} />
                            <div className="pet-role">{pet.adoption_status}</div>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <div id="allpets-div">
                    {selectedPet && (
                        <CustomModal
                            open={open}
                            onClose={() => setOpen(false)}
                            pet={selectedPet}
                        />
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default OwnerPets;

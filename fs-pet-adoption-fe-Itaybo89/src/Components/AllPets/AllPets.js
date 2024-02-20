import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import { useContext, useState, useEffect } from 'react';
import './allpets.css';
import { PetContext } from '../../ContextProviders/PetContext';
import CustomModal from '../CustomCard/CustomModal';

function AllPets() {
    const { allPetsList, fetchPet, selectedPet, setSelectedPet } = useContext(PetContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchPet();
        console.log(allPetsList);
    }, []);

    const handleClickOpen = (pet) => {
        setSelectedPet(pet);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="pet-container">
            <h1 className="pet-title">All Pets</h1>
            <List className="pet-list">
                {allPetsList.map((pet, index) => (
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

export default AllPets;

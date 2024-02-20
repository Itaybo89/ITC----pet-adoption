import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CustomModal from '../CustomCard/CustomModal';
import { UserContext } from '../../ContextProviders/UserContext';
import './mypetpage.css';


function MyPets() {
    const [open, setOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const { getUserPets, userPets } = useContext(UserContext);

    useEffect(() => {
        getUserPets();
    }, []);

    const openModal = (pet) => {
        setSelectedPet(pet);
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Container sx={{ py: 8 }} maxWidth="md" id="cont">
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        My Pets
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {userPets ? (
                        userPets.map((pet, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: '100%',  
                                            cursor: 'pointer',
                                        }}
                                        image={pet.image_path}
                                        onClick={() => openModal(pet)}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6">
                                            {pet.pet_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {pet.adoption_status}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <h1>You are a bad person...</h1>
                    )}

                </Grid>
            </Container>

            {selectedPet && (
                <CustomModal open={open} onClose={closeModal} pet={selectedPet} />
            )}
        </>
    );
}

export default MyPets;

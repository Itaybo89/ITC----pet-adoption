import React, { useContext } from "react";
import {
  Modal,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./custommodal.css";
import { PetContext } from "../../ContextProviders/PetContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../ContextProviders/UserContext";

function CustomModal({ open, onClose, pet }) {
  const { adoptPet, fosterPet, deletePet, abandonPet } = useContext(PetContext);
  const { addFavoritePet, removeFromFavorites, selectedUser, favorites } =
    useContext(UserContext);
  const navigate = useNavigate();
  console.log('favorites', favorites);

  const isValidUser =
    selectedUser.role === "admin" || selectedUser.role === "user";

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Card className="custom-card">
        <CardMedia
          component="img"
          className="custom-card-media"
          image={pet.image_path}
          alt={pet.pet_name}
        />
        <CardContent>
          <Typography variant="h5" component="div" id="custom-modal-title">
            {pet.pet_name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            id="custom-modal-description"
          >
            {pet.text}
          </Typography>
        </CardContent>
        <Accordion className="custom-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="extra-details-content"
            id="extra-details-header"
          >
            <Typography>Extra Details</Typography>
          </AccordionSummary>
          <AccordionDetails className="custom-accordion-details">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Age: {pet.age}</Typography>
                <Typography>Height: {pet.height} cm</Typography>
                <Typography>Weight: {pet.weight} kg</Typography>
                <Typography>Color: {pet.color}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Breed: {pet.breed}</Typography>
                <Typography>Type: {pet.type}</Typography>
                <Typography>Status: {pet.adoption_status}</Typography>
                <Typography>Hypoallergenic: {pet.hypoallergenic}</Typography>
                <Typography>Diet: {pet.dietary_restrictions}</Typography>
              </Grid>
            </Grid>
            {isValidUser && pet.adoption_status !== "Adopted" && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => adoptPet(pet.petID)}
              >
                Adopt Pet
              </Button>
            )}
            {isValidUser && pet.adoption_status === "In Stock" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => fosterPet(pet.petID)}
              >
                Foster Pet
              </Button>
            )}
            {selectedUser.role === "admin" && (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    onClose();
                    deletePet(pet.petID);
                  }}
                >
                  Delete Pet
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/allpets/edit/${pet.petID}`)}
                >
                  Edit Pet
                </Button>
              </>
            )}
            {isValidUser && (
              <>
                {favorites.includes(pet.petID) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      removeFromFavorites(pet.petID);
                      onClose();
                    }}
                  >
                    Unsave Pet
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      addFavoritePet(pet.petID);
                      onClose();
                    }}
                  >
                    Save Pet
                  </Button>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </Card>
    </Modal>
  );
}

export default CustomModal;

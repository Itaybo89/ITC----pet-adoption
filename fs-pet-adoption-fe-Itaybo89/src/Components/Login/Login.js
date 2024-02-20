import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Modal, TextField, Typography } from "@mui/material";
import "./login.css";
import CustomButton from "../CustomButton/CustomeButton";
import { UserContext } from "../../ContextProviders/UserContext";


function SignInModal({ open, handleClose }) {
  const {verifyUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting login form...");
    verifyUser(formData); 
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-container">
        <Typography variant="h6" className="login-modal-title">
          Sign In
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          className="modal-input"
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          fullWidth
          className="modal-input"
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <div className="modal-button-container">
          <CustomButton
            onClickFunction={handleSubmit}
            buttonText="Sign In"
            buttonColor="primary"
          />
          <CustomButton
            onClickFunction={handleClose}
            buttonText="Close"
            buttonColor="secondary"
          />
        </div>
      </div>
    </Modal>
  );
}

SignInModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SignInModal;

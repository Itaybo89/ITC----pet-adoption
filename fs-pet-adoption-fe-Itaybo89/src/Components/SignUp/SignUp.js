import React, { useContext, useState } from 'react';
import { Modal, TextField, Typography } from '@mui/material';
import './signup.css';
import CustomButton from '../CustomButton/CustomeButton';
import { UserContext } from '../../ContextProviders/UserContext';

function SignUpModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const {addUser} = useContext(UserContext);
  const handleChange = (event, field) => {
    const newValue = event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));

    if (field === 'confirmPassword') {
      setError(newValue === formData.password ? '' : 'Passwords do not match');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error) {
      const newUserDetails = {
        email: formData.email,
        password: formData.password,
      }
      console.log('Submitting sign-up form...');
      addUser(newUserDetails);
      handleClose();
    }
    else {
      console.log('creation of user failed via front');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-container">
        <Typography variant="h6" className="modal-title">
          Sign Up
        </Typography>
        {['email', 'password', 'confirmPassword'].map((field, index) => (
          <TextField
            key={index}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            variant="outlined"
            type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
            fullWidth
            className="modal-input"
            value={formData[field]}
            onChange={(e) => handleChange(e, field)}
            required  
          />
        ))}
        {error && (
          <Typography color="error" variant="body2" className="password-match-error">
            {error}
          </Typography>
        )}
        <div className="modal-button-container">
          <CustomButton
            onClickFunction={handleSubmit}
            buttonText="Sign Up"
            buttonColor="primary"
            fullWidth
            disabled={Boolean(error)}
          />
          <CustomButton
            onClickFunction={handleClose}
            buttonText="Close"
            buttonColor="secondary"
            fullWidth
          />
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;

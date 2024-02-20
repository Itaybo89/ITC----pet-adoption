import React, { useEffect, useState, useContext } from 'react';
import { TextField, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { UserContext } from '../../ContextProviders/UserContext';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const { getUserDetails, updateProfile } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const details = await getUserDetails();
      if (details) {
        setUserDetails(details);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(userDetails); 
  };

  return (
    <div id="container-edit-profile">
      <Container id="form-box">
        <Typography id="edit-title" variant="h4">Profile</Typography>
        <div className="form-container">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="form-column">
                <TextField label="Email" name="email" variant="outlined" value={userDetails.email || ''} onChange={handleChange} fullWidth margin="normal" required disabled />
                <TextField label="First Name" name="first_name" variant="outlined" value={userDetails.first_name || ''} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Last Name" name="last_name" variant="outlined" value={userDetails.last_name || ''} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Phone Number" name="phone_number" variant="outlined" value={userDetails.phone_number || ''} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Short Bio" name="short_bio" variant="outlined" value={userDetails.short_bio || ''} onChange={handleChange} fullWidth margin="normal" required />
              </div>
            </div>
            <div className="form-button-container">
              <Button variant="outlined" color="primary" type="submit">Save Changes</Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>Cancel</Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Profile;

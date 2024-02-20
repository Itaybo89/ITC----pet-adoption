import React, { useContext, useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { UserContext } from '../../ContextProviders/UserContext';
import './mainpage.css';
import CustomButton from '../../Components/CustomButton/CustomeButton';
import slider1 from '../../assets/slider1.png';
import slider2 from '../../assets/slider2.png';
import slider3 from '../../assets/slider3.png';
import slider4 from '../../assets/slider4.png';
import slider5 from '../../assets/slider5.png';

function SlowChangingImages({ imageUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, imageUrls]);

  return (
    <div id="slow-image-container">
      <img src={imageUrls[currentIndex]} alt="Slow Changing" />
    </div>
  );
}

function MainPage() {
  const { setSignInModalOpen, setSignUpModalOpen, selectedUser } = useContext(UserContext);
  const imageUrls = [slider1, slider2, slider3, slider4, slider5];

  return (
    <div id="container">
      <div id="div-title">
        <Typography variant="h2" align="center" className="title">
          Adop(e)t
        </Typography>
        <Typography variant="h5" align="center" style={{ color: '#4CAF50' }}>
          {selectedUser ? `Welcome ${selectedUser.first_name} ${selectedUser.last_name}` : 'Welcome Guest'}
        </Typography>
        
        {!selectedUser && (
          <Box display="flex" justifyContent="center" marginTop={2}>
            <CustomButton
              onClickFunction={() => setSignInModalOpen(true)}
              buttonText="Login"
              buttonColor="primary"
            />
            <CustomButton
              onClickFunction={() => setSignUpModalOpen(true)}
              buttonText="Sign Up"
              buttonColor="secondary"
            />
          </Box>
        )}

        <div id="image-wrapper">
          <SlowChangingImages imageUrls={imageUrls} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

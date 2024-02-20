import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import elphont from '../../assets/footer-ele.png';

function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: '1%',
        height: '30px',
        mt: 'auto',
        backgroundColor: '#0a3d62',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0, 
        right: 0
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <img
          src={elphont}
          alt="footer icon"
          style={{ marginRight: '8px', width: '30px', height: '30px' }}
        />
        <Typography variant="body1" sx={{ color: 'white' }}>
          pets pets pets pets
        </Typography>
        <img
          src={elphont}
          alt="footer icon"
          style={{ marginLeft: '8px', width: '30px', height: '30px' }}
        />
      </Container>
    </Box>
  );
}

export default StickyFooter;

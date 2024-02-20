import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';

function CustomCard({ onClick, image, name, info }) {
  console.log("Image URL:", image); 

  return (
    <Card sx={{ width: 300, height: 400, backgroundColor: 'rgba(255, 192, 203, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={onClick}>
      <Box sx={{ position: 'relative', height: '80%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {info}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomCard;

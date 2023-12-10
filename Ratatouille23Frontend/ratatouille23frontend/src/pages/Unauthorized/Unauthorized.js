import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export default function Unauthorized() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.pagesBackground.main,
      }}
    >
      <Typography variant="h1" style={{ color: theme.palette.black.main }}>
        Errore
      </Typography>
      <Typography variant="h6" style={{ color: theme.palette.black.main }}>
        Accesso non autorizzato
      </Typography>
      
    </Box>
  );
}
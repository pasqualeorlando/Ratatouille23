import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export default function NotFound() {
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
        404
      </Typography>
      <Typography variant="h6" style={{ color: theme.palette.black.main }}>
        La pagina che stai cercando non esiste
      </Typography>
    </Box>
  );
}
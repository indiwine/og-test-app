import { Box, Typography } from '@mui/material';
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
}

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <Box sx={{m: 2, marginTop: 4}}>
      {title && <Typography variant="h4" component='h2' sx={{marginBottom: 4}}>{title}</Typography>}
      {children}
    </Box>
  );
}

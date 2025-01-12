import { Typography } from '@mui/material';

export function ModalTitle({children}: { children: React.ReactNode }) {
  return (
    <Typography variant="h6" component="h2">
      {children}
    </Typography>
  );
}

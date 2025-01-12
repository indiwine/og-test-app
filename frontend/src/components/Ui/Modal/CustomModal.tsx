import React, { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { Box, Modal, SxProps } from '@mui/material';

export interface CustomModalActionsRef {
  open: () => void;
  close: () => void;
}

export type CustomModalForwardRef = ForwardedRef<CustomModalActionsRef>;


interface CustomModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const style: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const CustomModal = forwardRef((props: CustomModalProps, ref: CustomModalForwardRef) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        {props.children}
      </Box>
    </Modal>
  );
});

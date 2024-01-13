import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { CloseButton } from 'react-bootstrap';
import './modal.css';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  outline: 'none',
  borderRadius: '10px'
};

export default function ImageModal(props) {
  const { open, setOpen, devices, locations, getData, image } = props;
  console.log(image)
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CloseButton style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={() => { setOpen(false); }} />
            <Image
              src={`http://localhost:3030/${image}`}
              alt="QR Code"
              width={400}
              height={400}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

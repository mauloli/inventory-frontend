import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './modal.css';
import { useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  outline: 'none',
  borderRadius: '10px'
};

export default function EditLocationModal(props) {
  const { open, setOpen, data, patchData } = props;

  const [form, setForm] = useState({
    lokasi: data.lokasi || '',
    room: data.room || ''
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchData(form);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              New Location
            </span>
          </div>
          <div style={{ display: 'flex', height: '80%', width: '100%', margin: '0px 20px' }}>

            {/* modal kiri */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
              <div className='modalTableLeft'>
                <span>
                  Lokasi
                </span>
                <input type="text" placeholder='masukan nama lokasi' name='lokasi' onChange={handleChangeForm} value={form.lokasi} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  room
                </span>
                <input type="text" placeholder='masukan nama ruangan' name='room' onChange={handleChangeForm} value={form.room} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
            <button type="button" className="btn btn-success mx-3" onClick={handleSubmit}>Update</button>
            <button type="button" class="btn btn-warning" onClick={() => { setOpen(false); }}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
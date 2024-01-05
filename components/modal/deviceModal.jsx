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
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  outline: 'none',
  borderRadius: '10px'
};

export default function DeviceModal(props) {
  const { open, setOpen, types, createData } = props;
  const [form, setForm] = useState({
    name: '',
    brand: '',
    id_type: 0
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData(form);
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
              New Device
            </span>
          </div>
          <div style={{ display: 'flex', height: '90%', width: '100%', margin: '0px 20px' }}>

            {/* modal kiri */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
              <div className='modalTableLeft'>
                <span>
                  Device
                </span>
                <input name='name' type="text" placeholder='Masukan Device' onChange={handleChangeForm} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Brand
                </span>
                <input type="text" placeholder='Masukan brand' name='brand' onChange={handleChangeForm} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Type
                </span>
                <select name="id_type" id="" value={form.id_type} onChange={handleChangeForm}>
                  <option value="0" disabled>Select your option</option>
                  {
                    types.map(item => (
                      <option key={item.id} value={item.id}>{item.type}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
            <button type="button" className="btn btn-success mx-3" onClick={handleSubmit}>Add</button>
            <button type="button" class="btn btn-warning" onClick={() => { setOpen(false); }}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
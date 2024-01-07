import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './modal.css';
import { BsEyeFill } from 'react-icons/bs';
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

export default function UsersModal(props) {
  const { open, setOpen, createData } = props;
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    if (form.password != form.confirmPassword) {
      alert('Password tidak sesuai')
      throw new Error('password tidak sesuai')
    }
    
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
              New inventory
            </span>
          </div>
          <div style={{ display: 'flex', height: '90%', width: '100%', margin: '0px 20px' }}>

            {/* modal kiri */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
              <div className='modalTableLeft'>
                <span>
                  Name
                </span>
                <input name='name' type="text" placeholder='name' onChange={handleChangeForm} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Username
                </span>
                <input name='username' type="text" placeholder='username' onChange={handleChangeForm} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Password
                </span>
                <input name='password' type="password" placeholder='password' onChange={handleChangeForm} />
                <BsEyeFill style={{ position: 'absolute', top: '61.5%', right: '80' }} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Confirm Password
                </span>
                <input name='confirmPassword' type="password" placeholder='confirm password' onChange={handleChangeForm} />
                <BsEyeFill style={{ position: 'absolute', top: '82%', right: '80' }} />

              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
            <button type="button" className="btn btn-success mx-3" onClick={handleSubmit} >Add</button>
            <button type="button" class="btn btn-warning" onClick={() => { setOpen(false); }}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
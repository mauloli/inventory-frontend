import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './modal.css';
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

export default function BasicModal(props) {
  const { open, setOpen } = props;

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
                  Hostname
                </span>
                <input type="text" placeholder='162.168.1.1.1' />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Devices
                </span>
                <select name="" id="" value='0'>
                  <option value="0" disabled>Select your option</option>
                  {/* {devices.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))} */}
                </select>
              </div>
              <div className='modalTableLeft'>
                <span>
                  Type
                </span>
                <select name="" id="" value='1'>
                  <option value="1" disabled>Select your option</option>
                  <option value="">test</option>
                  <option value="">tast</option>
                  <option value="">tost</option>
                </select>
              </div>
              <div className='modalTableLeft'>
                <span>
                  Location
                </span>
                <select name="" id="" value='1'>
                  <option value="1" disabled>Select your option</option>
                  <option value="">test</option>
                  <option value="">tast</option>
                  <option value="">tost</option>
                </select>
              </div>
            </div>

            {/* modal kanan */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
              <div className='modalTableLeft'>
                <span>
                  SN / Mac
                </span>
                <input type="text" placeholder='162.168.1.1.1' />
              </div>
              <div className='modalTableLeft'>
                <span>
                  IP Adress
                </span>
                <input type="text" placeholder='162.168.1.1.1' />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Brand
                </span>
                <input type="text" placeholder='162.168.1.1.1' />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Status
                </span>
                <select name="" id="" value='1'>
                  <option value="1" disabled>Select your option</option>
                  <option value="">test</option>
                  <option value="">tast</option>
                  <option value="">tost</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
            <button type="button" className="btn btn-success mx-3">Add</button>
            <button type="button" class="btn btn-warning" onClick={() => { setOpen(false); }}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
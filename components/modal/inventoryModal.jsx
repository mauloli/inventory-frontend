import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axiosApiIntances from '@/utils/axios';
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

export default function InventoryModal(props) {
  const { open, setOpen, devices, locations, getData } = props;
  const [device, setDevice] = useState(0);
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [status, setStatus] = useState(100);
  const [form, setForm] = useState({
    hostname: '',
    mac_address: '',
    ip_address: '',
    status: 0,
    user_modified: 1,
    id_location: 0,
    id_device: 0,
    id_user: 1
  });

  const allStatus = [
    { id: 0, name: 'standby' },
    { id: 1, name: 'active' },
    { id: 2, name: 'broken' }
  ];

  const handleDeviceChange = (e) => {
    const { name, value } = e.target;
    const searchBrand = devices.find(item => item.id == value);

    setBrand(searchBrand.brand);
    setType(searchBrand.type.type);
    setDevice(value);
    setForm({ ...form, [name]: value });
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;

    setStatus(value);
    setForm({ ...form, [name]: value });
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosApiIntances.post('/inventory', form);
      getData();
      setForm({
        hostname: '',
        mac_address: '',
        ip_address: '',
        status: 0,
        user_modified: 1,
        id_location: 0,
        id_device: 0,
        id_user: 1
      });
      setOpen(false);
      setDevice(0);
      setType('');
      setBrand('');
    } catch (error) {
      alert(error.response.data.name);
    }
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
                  Hostname
                </span>
                <input type="text" placeholder='162.168.1.1.1' name='hostname' onChange={handleChangeForm} value={form.hostname} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Devices
                </span>
                <select name="id_device" id="" value={device} onChange={handleDeviceChange} >
                  <option value="0" disabled>Select your option</option>
                  {devices.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className='modalTableLeft'>
                <span>
                  Type
                </span>
                <input type="text" placeholder='162.168.1.1.1' value={type} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Location
                </span>
                <select name="id_location" id="" value={form.id_location} onChange={handleChangeForm}>
                  <option value="0" disabled>Select your option</option>
                  {locations.map(item => (
                    <option key={item.id} value={item.id}>{`${item.lokasi} ${item.room}`}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* modal kanan */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
              <div className='modalTableLeft'>
                <span>
                  SN / Mac
                </span>
                <input type="text" placeholder='162.168.1.1.1' name='mac_address' onChange={handleChangeForm} value={form.mac_address} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Brand
                </span>
                <input type="text" placeholder='162.168.1.1.1' value={brand} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  IP Adress
                </span>
                <input type="text" placeholder='162.168.1.1.1' name='ip_address' onChange={handleChangeForm} value={form.ip_address} />
              </div>
              <div className='modalTableLeft'>
                <span>
                  Status
                </span>
                <select name="status" id="" value={status} onChange={handleStatusChange}>
                  <option value="100" disabled>Select your option</option>
                  {allStatus.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
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
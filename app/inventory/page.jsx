'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './inventory.css'; // Import the external CSS file
import InventoryModal from '@/components/modal/inventoryModal';
import InventoryEditModal from '@/components/modal/editInventory';
import ImageModal from '@/components/modal/image';
import { BsArrowLeftSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/utils/axios';
import { PiNotePencil, PiTrashLight, PiQrCode } from 'react-icons/pi';


function Page() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const [result, setResult] = useState([]);
  const [devices, setDevices] = useState([]);
  const [location, setLocation] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [image, setImage] = useState('');
  const [resultId, setResultId] = useState({});
  const limit = 10;

  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page');
  const [skip, setSkip] = useState(pageParams ? Number((pageParams - 1) * 10) : 0);

  useEffect(() => {
    if (pageParams) {
      setPage(Number(pageParams));
    }

    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (resultId && resultId.id)
      setOpenEdit(true);
  }, [resultId]);

  const handlePage = (e, v) => {
    setPage(v);
    setSkip((v - 1) * limit);
    router.push(`inventory?page=${v}`);
  };

  const getById = async (id) => {
    const result = await axios.get(`/inventory/${id}`);
    setResultId(result.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/inventory/${id}`);

    } catch (error) {
      alert(error.response.data.message)
    }
    getData();
  };

  const getData = async () => {
    try {
      const resultt = await axios.get(`/inventory?$limit=${limit}&$skip=${skip}&$sort[created_at]=-1`);
      const resultDevice = await axios.get('/devices?$limit=-1');
      const resultLocation = await axios.get('/location?$limit=-1');

      const { data } = resultt;
      setDevices(resultDevice.data);
      setLocation(resultLocation.data);
      setResult(data.data);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleImage = (image) => {
    setOpenImage(true);
    setImage(image)
  };


  return (
    <Layout selected={'inventory'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <InventoryModal open={open} setOpen={setOpen} devices={devices} locations={location} getData={getData} />
        {
          resultId && resultId.id && openEdit
            ? <InventoryEditModal open={openEdit} setOpen={setOpenEdit} devices={devices} locations={location} getData={getData} resultId={resultId} />
            : ''
        }
        {openImage
          ? <ImageModal open={openImage} setOpen={setOpenImage} image={image} />
          : ''
        }
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '13px' }}>
          <div onClick={() => { router.push('/'); }} style={{ cursor: 'pointer' }}>
            <BsArrowLeftSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>Dashboard</span>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => handleOpen()}>
            <BsPlusSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>New inventory</span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '98%', margin: '0px' }}>
            <thead style={{ backgroundColor: 'rgb(196, 196, 196)' }}>
              <tr>
                <th>ID</th>
                <th>Hostname</th>
                <th>Device</th>
                <th>Brand</th>
                <th>type</th>
                <th>SN / Mac</th>
                <th>Location</th>
                <th>Room</th>
                <th>IP Address</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => {
                const createdAtDate = new Date(item.created_at);
                createdAtDate.toISOString();
                const formattedDate = `${createdAtDate.getDate()} ${createdAtDate.toLocaleString('default', { month: 'short' })} ${createdAtDate.getFullYear()}`;
                const status = item.status == 1 ? 'active' : item.status == 2 ? 'broken' : 'standby';
                const arrayMac = item.mac_address.split('/');
                const macAddress = arrayMac.length == 2 ? arrayMac[1] : arrayMac[0];
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.hostname}</td>
                    <td>{item.device.name}</td>
                    <td>{item.device.brand}</td>
                    <td>{item.device.type.type}</td>
                    <td>{macAddress}</td>
                    <td>{item.location.lokasi}</td>
                    <td>{item.location.room}</td>
                    <td>{item.ip_address}</td>
                    <td>{formattedDate}</td>
                    <td>{status}</td>
                    <td>
                      <PiNotePencil size={20} cursor={'pointer'} onClick={() => { getById(item.id); }} />
                      <PiQrCode size={20} cursor={'pointer'} onClick={() => { handleImage(item.image); }} />
                      <PiTrashLight color='red' size={20} cursor={'pointer'} onClick={() => { handleDelete(item.id); }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Pagination count={Math.round(total / limit)} variant="outlined" shape="rounded" page={page} onChange={handlePage} />
          </Stack>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

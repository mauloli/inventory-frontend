'use client';
import React, { useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './device.css'; // Import the external CSS file
import DeviceModal from '@/components/modal/deviceModal';
import EditDevice from '@/components/modal/editDevice';
import { useEffect } from 'react';
import { BsArrowLeftSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/utils/axios';
import { PiNotePencil, PiTrashLight, PiQrCode } from 'react-icons/pi';


function Page() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [devices, setDevices] = useState([]);
  const [types, setTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [resultId, setResultId] = useState({});

  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page');
  const [skip, setSkip] = useState(pageParams ? Number((pageParams - 1) * 10) : 0);
  const limit = 10;
  const router = useRouter();

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
    if (resultId && resultId.id) setOpenEdit(true);
  }, [resultId]);

  const handleOpen = () => setOpen(true);

  const getData = async () => {
    try {
      const result = await axios.get(`/devices?$limit=${limit}&$skip=${skip}&$sort[created_at]=-1`);
      const resultType = await axios.get('/type?$limit=-1');

      const { data } = result;
      setDevices(data.data);
      setTotal(data.total);
      setTypes(resultType.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const getById = async (id) => {
    const result = await axios.get(`/devices/${id}`);
    setResultId(result.data);
  };

  const createData = async (data) => {
    try {
      await axios.post('/devices', data);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const patchData = async (data) => {
    try {
      await axios.patch(`/devices/${resultId.id}`, data);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const deleteData=async(id)=>{
    try {
      await axios.delete(`/devices/${id}`);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handlePage = (e, v) => {
    setPage(v);
    setSkip((v - 1) * limit);
    router.push(`device?page=${v}`);
  };

  return (
    <Layout selected={'device'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        {
          open
            ? <DeviceModal open={open} setOpen={setOpen} types={types} createData={createData} />
            : ''
        }
        {
          resultId && resultId.id && openEdit
            ? <EditDevice open={openEdit} setOpen={setOpenEdit} types={types} patchData={patchData} data={resultId} />
            : ''
        }
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '13px' }}>
          <div>
            <BsArrowLeftSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>Dashboard</span>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => handleOpen()}>
            <BsPlusSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>New Devices</span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '98%', margin: '0px' }}>
            <thead style={{ backgroundColor: 'rgb(196, 196, 196)' }}>
              <tr>
                <th style={{ width: '100px' }}>ID</th>
                <th>Device</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.type.type}</td>
                  <td>
                    <PiNotePencil size={20} cursor={'pointer'} onClick={() => { getById(item.id); }} />
                    <PiTrashLight color='red' size={20} cursor={'pointer'} onClick={() => { deleteData(item.id); }} />
                  </td>
                </tr>
              ))}
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

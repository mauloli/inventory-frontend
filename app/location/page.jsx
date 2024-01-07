'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './type.css'; // Import the external CSS file
import LocationModal from '@/components/modal/locationModal';
import EditLocationModal from '@/components/modal/editLocation';
import { PiNotePencil, PiTrashLight } from 'react-icons/pi';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/utils/axios';
import { BsArrowLeftSquareFill, BsPlusSquareFill } from 'react-icons/bs';

function Page() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [locations, setLocations] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [resultId, setResultId] = useState({});

  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page');
  const [skip, setSkip] = useState(pageParams ? Number((pageParams - 1) * 10) : 0);
  const limit = 10;
  const router = useRouter(); const handleOpen = () => setOpen(true);

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

  const getData = async () => {
    try {
      const result = await axios.get(`/location?$limit=${limit}&$skip=${skip}&$sort[created_at]=-1`);
      const { data } = result;

      setTotal(data.total);
      setLocations(data.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const getById = async (id) => {
    const result = await axios.get(`/location/${id}`);
    setResultId(result.data);
  };

  const createData = async (data) => {
    try {
      await axios.post('/location', data);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const patchData = async (data) => {
    try {
      await axios.patch(`/location/${resultId.id}`, data);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`/location/${id}`);
      getData();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handlePage = (e, v) => {
    setPage(v);
    setSkip((v - 1) * limit);
    router.push(`location?page=${v}`);
  };

  return (
    <Layout selected={'location'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <LocationModal open={open} setOpen={setOpen} createData={createData} />
        {
          resultId && resultId.id && openEdit
            ? <EditLocationModal open={openEdit} setOpen={setOpenEdit} patchData={patchData} data={resultId} />
            : ''
        }
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '13px' }}>
          <div>
            <BsArrowLeftSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>Dashboard</span>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => handleOpen()}>
            <BsPlusSquareFill style={{ marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold' }}>New Location</span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '98%', margin: '0px' }}>
            <thead style={{ backgroundColor: 'rgb(196, 196, 196)' }}>
              <tr>
                <th style={{ width: '100px' }}>ID</th>
                <th>Location</th>
                <th>Room</th>
                <th style={{ width: '200px' }}>action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.lokasi}</td>
                  <td>{item.room}</td>
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

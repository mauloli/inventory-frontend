'use client';
import React, { useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './type.css'; // Import the external CSS file
import Modals from '@/components/modal/page';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from '@/utils/axios';
import { PiNotePencil, PiTrashLight } from 'react-icons/pi';

function Page() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [types, setTypes] = useState([]);
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

  const getData = async () => {
    try {
      const result = await axios.get(`/type?$limit=${limit}&$skip=${skip}&$sort[created_at]=-1`);
      const { data } = result;

      setTotal(data.total);
      setTypes(data.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handlePage = (e, v) => {
    setPage(v);
    setSkip((v - 1) * limit);
    router.push(`type?page=${v}`);
  };

  const handleOpen = () => setOpen(true);

  const dummyPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Layout selected={'type'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <Modals open={open} setOpen={setOpen} />

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '13px' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Dashboard</span>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => handleOpen()}>
            <span style={{ fontWeight: 'bold' }}>New Type</span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '98%', margin: '0px' }}>
            <thead style={{ backgroundColor: 'rgb(196, 196, 196)' }}>
              <tr>
                <th style={{ width: '100px' }}>ID</th>
                <th>Type</th>
                <th style={{ width: '200px' }}>action</th>
              </tr>
            </thead>
            <tbody>
              {types.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
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

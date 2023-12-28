'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './inventory.css'; // Import the external CSS file
import Modals from '@/components/modal/page';
import { BsArrowLeftSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';


function Page() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const handleOpen = () => setOpen(true);
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    try {
      const resultt = await axios.get(`/inventory?$limit=${limit}&$skip=${skip}`);
      const { data } = resultt;
      setResult(data.data);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };


  return (
    <Layout selected={'inventory'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <Modals open={open} setOpen={setOpen} />

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
                const createdAtDate = new Date(item.device.created_at);
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
                    <td>{'action'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Pagination count={Math.round(total / limit)} variant="outlined" shape="rounded" page={page} onChange={(e, v) => { setPage(v); setSkip((v - 1) * limit); }} />
          </Stack>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

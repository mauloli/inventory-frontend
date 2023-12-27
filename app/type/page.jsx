'use client';
import React, { useState } from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './type.css'; // Import the external CSS file
import Modals from '@/components/modal/page';

function Page() {
  const [open, setOpen] = useState(false);
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
                <th style={{width:'100px'}}>ID</th>
                <th>Type</th>
                <th style={{width:'200px'}}>action</th>
              </tr>
            </thead>
            <tbody>
              {dummyPages.map((item, index) => (
                <tr key={index}>
                  <td>1</td>
                  <td>tas</td>
                  <td>test</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

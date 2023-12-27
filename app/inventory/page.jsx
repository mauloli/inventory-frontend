import React from 'react';
import Layout from '@/components/layout/page';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './inventory.css'; // Import the external CSS file

function Page() {
  const dummyPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Layout selected={'inventory'}>
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '13px' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Dashboard</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>New inventory</span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '98%', margin: '0px' }}>
            <thead style={{backgroundColor:'rgb(196, 196, 196)'}}>
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
              {dummyPages.map((item, index) => (
                <tr key={index}>
                  <td>1</td>
                  <td>tas</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
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

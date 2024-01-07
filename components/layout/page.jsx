'use client';
import Avatar from '@mui/material/Avatar';
import SideBar from '../sidebar/sideBar';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Loader from '../loader/loader';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Layout({ selected = null, children }) {
  const [loading, setLoading] = useState(true);
  const dataUser = JSON.parse(localStorage.getItem('data'));
  const router = useRouter();
  useEffect(() => {
    setLoading(true);

    if (!dataUser) {
      setTimeout(() => {
        router.push('/login');
      }, 2100);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, []);


  return (
    loading ? <Loader /> :
      <div style={{ width: '100%', height: '100vh', display: 'flex', backgroundColor: '#F8FCE3' }}>
        <SideBar selected={selected} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 4 }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            marginLeft: '30px'
          }}>
            <div style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column'
            }}>
              <h3 style={{
                marginBottom: '0px', textDecoration: 'underline', fontWeight: 'bolder'
              }}>Welcomeback {dataUser.username}</h3>
              <span>Here are your, inventory management</span>
            </div>
            <div style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <input placeholder="search" style={{ textAlign: 'left', width: '200px', height: '35px', paddingLeft: '37px', borderRadius: '10px', border: '1px solid black' }} />
              <BsSearch style={{ position: 'absolute', right: '43.5%' }} />
            </div>
            <div style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar sx={{ marginRight: '10px' }}>{dataUser.username[0].toUpperCase()}</Avatar>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid black', marginLeft: '5px', paddingLeft: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{dataUser.username}</span>
                <span style={{ fontSize: '13px' }}>Network Engineering</span>
              </div>
            </div>

          </div>
          <div style={{ flex: 4, display: 'flex' }}>
            {children}
          </div>
        </div>
      </div >
  );
}

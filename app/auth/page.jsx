'use client';
import React from 'react';
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';


export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <div className={styles.boddy} style={{ margin: '0px', padding: '0px' }} >
      <img src='./loginn.jpg' style={{ position: 'absolute', zIndex: -1, height: '105vh', marginTop: '0px' }} />
      <div className={styles.frameLogin}>
        <h3 style={{ marginTop: '10px', marginBottom: '0px' }}>Login Into SSNI</h3>
        <div className='test' style={{
          display: 'flex', flexDirection: 'column', height: '70%', padding: '0px 30px'
        }}>
          <div className='form-username' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <label style={{
              textAlign: 'left', fontSize: '14px', marginBottom: '5px'
            }}>Account name or email:</label>
            <input type="text" id="username" name="username" required style={{
              height: '45px', border: 'solid 1px rgb(135, 170, 172)', borderRadius: '25px ', backgroundColor: 'rgb(149, 187, 189)',
              textAlign: 'center'
            }} />
          </div>

          <div className='form-pasword' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <label style={{
              textAlign: 'left', fontSize: '14px', marginBottom: '5px'
            }}>Password:</label>
            <input type="password" id="password" name="password" required style={{
              height: '45px',
              border: 'solid 1px rgb(135, 170, 172)',
              borderRadius: '25px',
              backgroundColor: 'rgb(149, 187, 189)',
              textAlign: 'center',
            }} />
          </div>

        </div>
        <div>
          <button
            style={{
              width: '175px',
              height: '40px',
              border: '0px',
              borderRadius: '13px',
              backgroundColor: 'rgb(149, 187, 189)',
              marginTop: '10px',
              cursor: 'pointer'
            }}
            onClick={() => { router.push('/'); }}
          >Login</button>
        </div>

      </div>

    </div>
  );
}

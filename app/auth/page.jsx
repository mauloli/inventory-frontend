import React from 'react';
import styles from './auth.module.css';

export default function page() {
  return (
    <div className={styles.boddy} >
      <div className={styles.frameLogin}>
        <h3 style={{ marginTop: '10px', marginBottom: '0px' }}>Login Into SSNI</h3>
        <div className='test' style={{
          display: 'flex', flexDirection: 'column', height: '70%', padding: '0px 30px'
        }}>
          <div className='form-username' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <label for="username" style={{
              textAlign: 'left', fontSize: '14px', marginBottom: '5px'
            }}>Account name or email:</label>
            <input type="text" id="username" name="username" required style={{
              height: '45px', border: 'solid 1px rgb(135, 170, 172)', borderRadius: '25px ', backgroundColor: 'rgb(149, 187, 189)',
              textAlign: 'center'
            }} />
          </div>

          <div className='form-pasword' style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <label for="password" style={{
              textAlign: 'left', fontSize: '14px', marginBottom: '5px'
            }}>Password:</label>
            <input type="password" id="password" name="password" required style={{
              height: '45px', border: 'solid 1px rgb(135, 170, 172)', borderRadius: '25px', backgroundColor: 'rgb(149, 187, 189)',
              textAlign: 'center'
            }} />
            <i class="fas fa-eye" id="togglePassword"></i>
          </div>

        </div>
        <div>
          <button style={{ width: '175ox', height: '40px', border: '0px', borderRadius: '13px',backgroundColor: 'rgb(149, 187, 189)' ,marginTop:'10px'}}>Login</button>
        </div>

      </div>

    </div>
  );
}

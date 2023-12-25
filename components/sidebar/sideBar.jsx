'use client';
import React from 'react';
import styles from './side.module.css';
import { useRouter } from 'next/navigation';

function SideBar(props) {
  const { selected = null } = props;

  const router = useRouter();

  const generalMenu = ['dashboard', 'inventory', 'device', 'type', 'location'];
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '40px',
      marginRight: '30px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ cursor: 'pointer' }}>LOGO</h1>
      </div>
      <div className='sideBar' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
        <div className='generalBar' style={{ display: 'flex', flexDirection: 'column', height: '50%' }}>
          <span style={{ fontWeight: 'bold', fontSize: '17px' }}>General</span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', marginLeft: '20px' }}>
            {generalMenu.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`${selected == item ? styles.selected : ''} ${styles.spanSideBar}`}
                  onClick={() => { router.push(`/${item}`); }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              );
            })}
          </div>

        </div>
        <div className='supportBar' style={{ display: 'flex', flexDirection: 'column', height: '30%', justifyContent: 'space-around' }}>
          <span style={{ fontWeight: 'bold' }}>Support</span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', marginLeft: '20px' }}>
            <span className={` ${selected == 'contact' ? styles.selected : ''} ${styles.spanSideBar}`}>contact</span>
            <span className={` ${selected == 'user' ? styles.selected : ''} ${styles.spanSideBar}`}>User</span>
            <span className={` ${selected == 'logout' ? styles.selected : ''} ${styles.spanSideBar}`}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
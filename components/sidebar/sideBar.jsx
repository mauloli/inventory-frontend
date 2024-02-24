/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import styles from './side.module.css';
import { useRouter } from 'next/navigation';
import {
  AiFillHome,
  AiFillSetting,
  AiFillLayout,
  AiFillDropboxCircle,
  AiFillFlag
} from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';



function SideBar(props) {
  const { selected = null } = props;

  const onLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const router = useRouter();

  const generalMenu = ['dashboard', 'inventory', 'device', 'type', 'location'];
  const iconMenu = [
    <AiFillHome />,
    <AiFillLayout />,
    <AiFillSetting />,
    <AiFillDropboxCircle />,
    <AiFillFlag />
  ];

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '30px',
      paddingRight: '30px',
      backgroundColor: '#F6FDCF'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src='./ssni.png' alt="" width={'240px'} />
      </div>
      <div className='sideBar' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
        <div className='generalBar' style={{ display: 'flex', flexDirection: 'column', height: '50%' }}>
          <span style={{ fontWeight: 'bold', fontSize: '17px' }}>General</span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', marginLeft: '20px' }}>
            {generalMenu.map((item, index) => {
              return (
                <div key={index}>
                  {iconMenu[index]}
                  <span
                    key={index}
                    className={`${selected == item ? styles.selected : ''} ${styles.spanSideBar}`}
                    onClick={() => { router.push(`/${item}`); }}
                    style={{ marginLeft: '10px' }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
        <div className='supportBar' style={{ display: 'flex', flexDirection: 'column', height: '30%', justifyContent: 'space-around' }}>
          <span style={{ fontWeight: 'bold' }}>Support</span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', marginLeft: '20px' }}>
            {/* <div>
              <MdContacts />
              <span
                style={{ marginLeft: '10px' }}
                className={` ${selected == 'contact' ? styles.selected : ''} ${styles.spanSideBar}`}>contact</span>
            </div> */}
            <div>
              <FaUserAlt />
              <span
                style={{ marginLeft: '10px' }}
                className={` ${selected == 'user' ? styles.selected : ''} ${styles.spanSideBar}`}
                onClick={() => {
                  router.push('user');
                }

                }
              >User
              </span>
            </div>
            <div>
              <IoLogOut />
              <span
                style={{ marginLeft: '10px' }}
                className={` ${selected == 'logout' ? styles.selected : ''} ${styles.spanSideBar}`}
                onClick={onLogout}
              >
                Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
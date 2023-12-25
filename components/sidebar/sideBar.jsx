import React from 'react';

function SideBar() {
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
            <span>Dashboard</span>
            <span>Inventory</span>
            <span>Device</span>
            <span>Type</span>
            <span>Location</span>
          </div>

        </div>
        <div className='supportBar' style={{ display: 'flex', flexDirection: 'column', height: '30%', justifyContent: 'space-around' }}>
          <span style={{ fontWeight: 'bold' }}>Support</span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', marginLeft: '20px' }}>
            <span>contact</span>
            <span>User</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
'use client';
import Avatar from '@mui/material/Avatar';
import SideBar from '../sidebar/sideBar';
export default function Layout(props) {
  const { selected = null } = props;
  return (
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
            }}>Welcomeback Name</h3>
            <span>Here are your, inventory management</span>
          </div>
          <div style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <input placeholder="search" style={{ textAlign: 'left', width: '200px', height: '30px', paddingLeft: '20px', borderRadius: '10px', border: '1px solid black' }} />
          </div>
          <div style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={{}}>N</Avatar>
            <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid black', marginLeft: '5px', paddingLeft: '5px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Name User</span>
              <span style={{ fontSize: '13px' }}>Network Engineering</span>
            </div>
          </div>

        </div>
        <div style={{ flex: 4, display: 'flex' }}>
          {props.children}
        </div>
      </div>
    </div >
  );
}

import Avatar from '@mui/material/Avatar';

export default function Layout(props) {
  return (
    <div style={{ width: '100%', height: '90vh', display: 'flex' }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40px'
      }}>
        <h1 style={{ cursor: 'pointer' }}>LOGO</h1>
        <span>test</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column'
          }}>
            <h2 style={{
              marginBottom: '0px', textDecoration: 'underline'
            }}>Welcomeback Name</h2>
            <span>Here are your, inventory management</span>
          </div>
          <div style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <input placeholder="search" style={{ textAlign: 'left', width: '200px', height: '30px', paddingLeft: '20px', borderRadius: '10px', border: '1px solid black' }} />
          </div>
          <div style={{ display: 'flex', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={{}}>N</Avatar>
          </div>

        </div>
        <div style={{ flex: 4, display: 'flex' }}>
          {props.children}
        </div>
      </div>
    </div >
  );
}

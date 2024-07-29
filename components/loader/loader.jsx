'use client';
import React from 'react';
import { GridLoader } from 'react-spinners';
// import { BoltLoader } from 'react-awesome-loaders';


function Loader() {
  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
 <GridLoader/>
  </div>
  );
}

export default Loader;
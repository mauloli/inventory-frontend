'use client';
import React from 'react';
import { BoltLoader } from 'react-awesome-loaders';


function Loader() {
  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <BoltLoader
        className={'loaderbolt'}
        boltColor={'yellow'}
        backgroundBlurColor={'red'}
      />
    </div>
  );
}

export default Loader;
'use client';

import React from 'react';
import axios from '@/utils/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import crypto from 'crypto';

function DetailInventory({ params }) {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [decrypt, setDecrypt] = useState(false);
  const [decrypted, setDecrypted] = useState(null);

  const checkParams = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipher(algorithm, 'secretKey');
    try {
      let decryptedNumber = decipher.update(slug, 'hex', 'utf-8');
      decryptedNumber += decipher.final('utf-8');

      getData(decryptedNumber);

      setDecrypted(decryptedNumber);
    } catch (error) {
      setDecrypt(false);
    }
  };

  const status = {
    1: 'Active',
    2: 'Broken',
    0: 'Standby'
  };

  const getData = async (id) => {
    try {
      const result = await axios.get(`/inventory/${id}`);
      setData(result.data);
    } catch (error) {
      setData(null);
    }
  };

  useEffect(() => {
    checkParams();
  }, []);

  useEffect(() => {
    if (data && data.id) {
      setDecrypt(true);
    }
  }, [data]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {console.log(data)}
      <h1 style={{ textAlign: 'center',position:'absolute',top:100,left:'37%' }}>Inventory</h1>
      {decrypt
        ?
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Hostname</span>
            <span>Ip address</span>
            <span>Mac address</span>
            <span>Location</span>
            <span>Status</span>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>:</span>
            <span>:</span>
            <span>:</span>
            <span>:</span>
            <span>:</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{data.hostname}</span>
            <span>{data.ip_address}</span>
            <span>{data.mac_address}</span>
            <span>{`${data.location.lokasi} ${data.location.room}`}</span>
            <span>{status[data.status]}</span>
          </div>
        </div>
        :
        <div style={{ textAlign: 'center' }}> <h1 style={{ textAlign: 'center' }}>No data found</h1></div>
      }

    </div>
  );
}

export default DetailInventory;
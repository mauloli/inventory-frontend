'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/page';
import Loader from '@/components/loader/loader';
import styles from './page.module.css';
import CircleChart from '@/components/chart/circleChart';
import VerticalChart from '@/components/chart/verticalChart';
import HorizontalBarChart from '@/components/chart/horizontalChart';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const router = useRouter();
  const dataUser = JSON.parse(localStorage.getItem('data'));

  const reverseStatus = (data) => {
    const sortedDataStatus = data.sort((a, b) => b.status - a.status);
    const totalDataArray = sortedDataStatus.map(item => item.total_data);

    return totalDataArray;
  };

  const getByStatus = (status) => {
    const data = result.data_status.find(item => item.status == status).total_data;
    return data;
  };

  const getData = async () => {
    try {
      const resultt = await axios.get('/dashboard');
      setResult(resultt.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    setLoading(true);

    if (!dataUser) {
      setTimeout(() => {
        router.push('/login');
      }, 2100);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, []);

  return (
    loading ? <Loader /> :
      <Layout selected={'dashboard'} dataUser={dataUser}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* grafik bulat */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.circleChart}>
              <span>All devices</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#FF6384', '#36A2EB', '#FFCE56']}
                  dataChart={reverseStatus(result.data_status)}
                  totalData={result.total}
                />
              </div>
            </div>
            <div className={styles.circleChart}>
              <span>active</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#36A2EB']}
                  dataChart={[getByStatus(1)]}
                  totalData={result.total}
                />
              </div>
            </div>
            <div className={styles.circleChart}>
              <span>standby</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#FFCE56']}
                  dataChart={[getByStatus(0)]}
                  totalData={result.total}
                />
              </div>
            </div>
            <div className={styles.circleChart}>
              <span>broken</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#FF6384']}
                  dataChart={[getByStatus(2)]}
                  totalData={result.total}
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', marginTop: '60px' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <VerticalChart data={result.data_tahun}/>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <HorizontalBarChart data={result.data_location} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

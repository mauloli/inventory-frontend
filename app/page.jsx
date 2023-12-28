'use client';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/page';
import styles from './page.module.css';
import CircleChart from '@/components/chart/circleChart';
import VerticalChart from '@/components/chart/verticalChart';
import HorizontalBarChart from '@/components/chart/horizontalChart';
import { useRouter } from 'next/navigation';
import { CircleLoader } from 'react-spinners';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    
    const test = localStorage.getItem('data');

    if (!test) {
      setTimeout(() => {
        router.push('/login');
      }, 500);
    } else {
      setLoading(false);
    }
  }, []);

  const datta = [10, 20, 5];
  const totalData = 100;
  return (
    loading ? <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FCE3' }}>
      <CircleLoader size={150} />
    </div> :
      <Layout selected={'dashboard'}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* grafik bulat */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div className={styles.circleChart}>
              <span>All devices</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#FF6384', '#36A2EB', '#FFCE56']}
                  dataChart={datta}
                  totalData={totalData}
                />
              </div>
            </div>
            <div className={styles.circleChart}>
              <span>active</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#36A2EB']}
                  dataChart={[50]}
                  totalData={totalData}
                />
              </div>
            </div>
            <div className={styles.circleChart}>
              <span>standby</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#FFCE56']}
                  dataChart={[20]}
                  totalData={totalData}
                />
              </div>
            </div>
            <div className={styles.circleChart}>
              <span>broken</span>
              <div style={{ width: '200px' }}>
                <CircleChart
                  backgroundColor={['#FF6384']}
                  dataChart={[30]}
                  totalData={totalData}
                />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', marginTop: '60px' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <VerticalChart />
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <HorizontalBarChart />
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}

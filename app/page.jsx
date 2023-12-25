import React from 'react';
import Layout from '/components/layout/page';
import styles from './page.module.css';
import CircleChart from '@/components/chart/page';

export default function Home() {
  return (
    <Layout>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* grafik bulat */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles.circleChart}>
            <span>All devices</span>
            <div style={{ width: '200px' }}>
              <CircleChart
                backgroundColor={['#FF6384', '#36A2EB', '#FFCE56']}
                dataChart={[30, 50, 20]}
                totalData={100}
              />
            </div>
          </div>
          <div className={styles.circleChart}>
            <span>active</span>
            <div style={{ width: '200px' }}>
              <CircleChart
                backgroundColor={['#36A2EB']}
                dataChart={[50]}
                totalData={100}
              />
            </div>
          </div>
          <div className={styles.circleChart}>
            <span>standby</span>
            <div style={{ width: '200px' }}>
              <CircleChart
                backgroundColor={['#FFCE56']}
                dataChart={[20]}
                totalData={100}
              />
            </div>
          </div>
          <div className={styles.circleChart}>
            <span>broken</span>
            <div style={{ width: '200px' }}>
              <CircleChart
                backgroundColor={['#FF6384']}
                dataChart={[30]}
                totalData={100}
              />
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>chart satu</div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>chart dua</div>
        </div>
      </div>
    </Layout>
  );
}

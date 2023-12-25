import React from 'react';
import Layout from '/components/layout/page';
import styles from './page.module.css';
import CircleChart from '@/components/chart/circleChart';
import VerticalChart from '@/components/chart/verticalChart';
import HorizontalBarChart from '@/components/chart/horizontalChart';
export default function Home() {
  const totalData = 100;
  return (
    <Layout selected={'dashboard'}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* grafik bulat */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles.circleChart}>
            <span>All devices</span>
            <div style={{ width: '200px' }}>
              <CircleChart
                backgroundColor={['#FF6384', '#36A2EB', '#FFCE56']}
                dataChart={[30, 50, 20]}
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

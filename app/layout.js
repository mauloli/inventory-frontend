import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Impor stylesheet Bootstrap

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Inventory',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

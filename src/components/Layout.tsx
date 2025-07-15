// Layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import './layout.css';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className='layout'>
      <Navbar />
      <main className='layout-content'>
        {children}
      </main>
    </section>
  );
};

export default Layout;


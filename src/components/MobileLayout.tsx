import React from 'react';
import Navbar from './Navbar';
import './MobileLayout.css';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="mobile-layout">
      <Navbar />
      <main className="mobile-content">
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;
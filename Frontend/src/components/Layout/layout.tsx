import React from 'react';
import Sidebar from '../shared/sidebar';

interface LayoutProps {
  children: React.ReactNode; // Asegura que el prop children sea de tipo React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;

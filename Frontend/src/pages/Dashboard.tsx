import React from 'react';
import Sidebar from '../components/shared/sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {/* Contenido principal del dashboard */}
      </div>
    </div>
  );
};

export default Dashboard;

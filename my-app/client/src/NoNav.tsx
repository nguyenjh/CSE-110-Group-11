import React from 'react';
import { Outlet } from 'react-router-dom';

const NoNavbarLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NoNavbarLayout;

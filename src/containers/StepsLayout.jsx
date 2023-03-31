import React from 'react';
import { Welcome } from '@components/Welcome';
import { Search } from '@components/Search';
import { Passengers } from '@components/Passengers';
import { Tickets } from '@components/Tickets';
import '@styles/StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    return <Welcome />;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 
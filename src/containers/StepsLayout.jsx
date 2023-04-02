import React from 'react';
import { Welcome } from '@components/Welcome';
import { Search } from '@components/Search';
import { Passengers } from '@components/Passengers';
import { Tickets } from '@components/Tickets';
import '@styles/StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    return state.matches("initial") ? <Welcome send={send}/> 
    : state.matches("search") ? <Search context={state.context} send={send}/> 
    : state.matches("passenger") ? <Passengers state={state} send={send}/>
    : state.matches("tickets") ? <Tickets send={send} context={state.context}/> 
    : null;
  }
  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 
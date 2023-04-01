import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '@components/Nav';
import { StepsLayout } from '@containers/StepsLayout';
import { ticketMachine } from '@machines/ticketMachine';
import '@styles/BaseLayout.css';


export const BaseLayout = () => {
  const [state, send] = useMachine(ticketMachine);

  console.log('nuestra maquina', state);
  console.log('nuestra context', state.context);
 
  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send}/>
      <StepsLayout state={state} send={send} />
    </div>
  );
}
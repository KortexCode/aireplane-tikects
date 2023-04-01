import React, { useEffect, useState } from 'react';
import '@styles/Search.css';

export const Search = ({ send, context }) => {
  const [flight, setFlight] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };
  const goToPassenger = () => {  
    send("CONTINUE", {selectedCountry: flight});

  }

  const options = context.countries;

  useEffect(()=>{
    console.log("paises", context.countries[1]?.name)
  },[context])
  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((country) => <option value={country.name.common}
         key={country.name.common}>{country.name.common}</option>)}
      </select>
      <button disabled={flight === ''} className='Search-continue button'
        onClick={goToPassenger}
      >
        Continuar
      </button>
    </div>
  );
}; 
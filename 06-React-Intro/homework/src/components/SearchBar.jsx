import React from 'react';

export default function SearchBar(onSearch) {
  // acá va tu código
  return (
    <div>
      <input type="text" name="search" id="search" placeholder="Busca tu ciudad..."/>
      <button onClick={() => onSearch("Algo")}>Agregar</button>
    </div>
  );
};
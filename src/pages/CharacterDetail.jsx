import React from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetail = () => {
  const { name } = useParams();
  return (
    <div className="container">
      <h2>Details for {name}</h2>
      {/* Detalles adicionales del personaje pueden agregarse aquí */}
    </div>
  );
};

export default CharacterDetail;
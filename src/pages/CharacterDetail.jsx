import React from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetail = () => {
  const { name } = useParams();
  return (
    <div className="container">
      <h2>Datos para {name}</h2>
    </div>
  );
};

export default CharacterDetail;
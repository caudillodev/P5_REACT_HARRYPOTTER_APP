// src/components/CharacterCard.jsx
import React from 'react';

const CharacterCard = ({ character }) => {
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhuEtFBCDQ6cu_EfSCteBljkAGyt3cKygDQ&s';

  // Debugging: Imprimir en consola para verificar los datos de character
  console.log('PERSONAJE RECIBIDO EN LA TARJETA:', character);

  // Verifica que character esté definido antes de intentar acceder a sus propiedades
  if (!character) {
    return <p>No character data available</p>;
  }

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img
        src={character.image || defaultImage}
        className="card-img-top"
        alt={`${character.name}`}
      />
      <div className="card-body">
        <h5 className="card-title harry-potter-title">{character.name || 'Unknown Name'}</h5>
        <p className="card-text harry-potter-font"><strong>Casa:</strong> {character.house || 'Unknown House'}</p>
        <p className="card-text harry-potter-font"><strong>Patronus:</strong> {character.patronus || 'Unknown Patronus'}</p>
        <p className="card-text harry-potter-font"><strong>Actor:</strong> {character.actor || 'Unknown Actor'}</p>
        <p className="card-text harry-potter-font"><strong>ID:</strong> {character.id || 'Unknown ID'}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
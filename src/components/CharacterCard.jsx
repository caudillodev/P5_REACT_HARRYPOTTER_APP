import React from 'react';

const CharacterCard = ({ character }) => {
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhuEtFBCDQ6cu_EfSCteBljkAGyt3cKygDQ&s';

  if (!character) {
    return <p>El personaje no está disponible</p>;
  }

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img
        src={character.image || defaultImage}
        className="card-img-top"
        alt={`${character.name}`}
      />
      <div className="card-body">
        <h5 className="card-title harry-potter-title">{character.name || 'Nombre desconocido'}</h5>
        <p className="card-text harry-potter-font"><strong>Casa:</strong> {character.house || 'Casa desconocida'}</p>
        <p className="card-text harry-potter-font"><strong>Patronus:</strong> {character.patronus || 'Patronus desconocido'}</p>
        <p className="card-text harry-potter-font"><strong>Actor:</strong> {character.actor || 'Actor desconocido'}</p>
        <p className="card-text harry-potter-font"><strong>ID:</strong> {character.id || 'ID desconocido'}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
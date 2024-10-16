import React from 'react';

const CharacterCard = ({ character }) => {

  const IMAGEN_POR_DEFECTO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhuEtFBCDQ6cu_EfSCteBljkAGyt3cKygDQ&s';

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img
        src={character.image || IMAGEN_POR_DEFECTO}
        className="card-img-top"
        alt={`${character.name}`}
      />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text"><strong>Casa:</strong> {character.house}</p>
        <p className="card-text"><strong>Patronus:</strong> {character.patronus}</p>
        <p className="card-text"><strong>Actor:</strong> {character.actor}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
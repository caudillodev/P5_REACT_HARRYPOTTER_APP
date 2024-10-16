import React from 'react';

const CharacterCard = ({ character }) => {
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={character.image} className="card-img-top" alt={`${character.name}`} />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text"><strong>House:</strong> {character.house}</p>
        <p className="card-text"><strong>Patronus:</strong> {character.patronus}</p>
        <p className="card-text"><strong>Actor:</strong> {character.actor}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
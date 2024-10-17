// src/components/CharacterList.jsx
import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import { fetchCharacters } from '../services/ApiHarryPotter';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getCharacters();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
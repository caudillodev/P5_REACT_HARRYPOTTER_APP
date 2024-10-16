import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://hp-api.herokuapp.com/api/characters');
        if (!response.ok) throw new Error('Error obtendiendo datos.');
        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCharacters();
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
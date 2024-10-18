import { useState } from 'react';
import { fetchHarryPotterCharacterById } from '../services/ApiHarryPotter';

const useFetchCharacterById = () => {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  const buscarPorId = async (searchId) => {
    if (!searchId) {
      setError('Ingrese el ID');
      return;
    }

    try {
      const characterData = await fetchHarryPotterCharacterById(searchId);
      if (characterData && characterData.length > 0) {
        setCharacter(characterData[0]);
        setError(null);
      } else {
        setError(`No se ha encontrado el personaje por el ID: ${searchId}`);
      }
    } catch (error) {
      setError(`No se ha encontrado el personaje por el ID: ${searchId}`);
      console.error('Error buscando el personaje por ID:', error);
    }
  };

  return { character, error, buscarPorId };
};

export default useFetchCharacterById;
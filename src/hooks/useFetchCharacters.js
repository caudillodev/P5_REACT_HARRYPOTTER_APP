import { useState, useEffect } from 'react';
import { fetchHarryPotterCharacters } from '../services/ApiHarryPotter';

const useFetchCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  const loadAllCharacters = async () => {
    try {
      const data = await fetchHarryPotterCharacters();
      setCharacters(data);
      setError(null); // Limpiar cualquier error previo
      console.log('Datos de personajes cargados:', data); // Agrega esta línea
    } catch (error) {
      setError('Error al buscar los personajes');
      console.error('Error buscando los personajes:', error);
    }
  };

  useEffect(() => {
    loadAllCharacters();
  }, []);

  return { characters, error, loadAllCharacters };
};

export default useFetchCharacters;
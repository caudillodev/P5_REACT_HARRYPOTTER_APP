// src/components/CharacterList.jsx
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import { fetchHarryPotterCharacters, fetchHarryPotterCharacterById } from '../services/ApiHarryPotter';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);

  // Función para cargar todos los personajes
  const loadAllCharacters = async () => {
    try {
      const data = await fetchHarryPotterCharacters();
      setCharacters(data);
      setError(null);  // Limpiar cualquier error previo
    } catch (error) {
      setError('Error fetching characters');
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    loadAllCharacters();
  }, []);

  // Maneja la búsqueda por ID
  const buscarPorId = async () => {
    if (!searchId) {
      setError('Please enter a character ID');
      return;
    }

    try {
      console.log('BUSCANDO POR ESTE ID!!!!:', searchId);
      const character = await fetchHarryPotterCharacterById(searchId);
      console.log('JSON ENCONTRADO', character);
      if (character) {
        setCharacters(character);  // Convertir el objeto a un array
        setError(null);
      } else {
        setError(`No character found with ID: ${searchId}`);
      }
    } catch (error) {
      setError(`No character found with ID: ${searchId}`);
      console.error('Error fetching character by ID:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center harry-potter-title">Harry Potter Characters</h1>
      
      {/* Botones de control */}
      <div className="control-buttons my-4 d-flex justify-content-center">
        {/* Botón de búsqueda por ID */}
        <input
          type="text"
          className="form-control me-2"
          style={{ maxWidth: '300px' }}
          placeholder="Search by Character ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary me-2" onClick={buscarPorId}>
          Search
        </button>

        {/* Botón para cargar todos los personajes nuevamente */}
        <button className="btn btn-secondary" onClick={loadAllCharacters}>
          Load All Characters
        </button>
      </div>

      {/* Mostrar mensaje de error si no se encuentra el personaje */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Renderizar personajes filtrados o todos los personajes */}
      <div className="row">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <CharacterCard character={character} />
            </div>
          ))
        ) : (
          <p className="text-center">No characters found</p>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
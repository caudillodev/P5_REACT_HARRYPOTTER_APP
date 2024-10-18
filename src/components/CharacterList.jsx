import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import useFetchCharacters from '../hooks/useFetchCharacters';
import useFetchCharacterById from '../hooks/useFetchCharacterById';
import '../assets/css/components/CharacterList.css';

const CharacterList = () => {
  const { characters, error: charactersError, loadAllCharacters } = useFetchCharacters();
  const { character, error: characterError, buscarPorId } = useFetchCharacterById();
  const [searchId, setSearchId] = useState('');

  const handleRefresh = () => {
    window.location.reload(); // Recarga la página
  };

  return (
    <div className="container">
      <h1 className="text-center harry-potter-title">Personajes de Harry Potter</h1>

      {/* Botones de control */}
      <div className="control-buttons my-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Buscar por ID de personaje"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary me-2" onClick={() => buscarPorId(searchId)}>
          Buscar
        </button>
        <button className="btn btn-secondary" onClick={handleRefresh}>
          Refrescar Página
        </button>
      </div>

      {/* Mostrar mensaje de error si no se encuentra el personaje */}
      {(characterError || charactersError) && (
        <p className="text-center text-danger">{characterError || charactersError}</p>
      )}

      {/* Renderizar personajes filtrados o todos los personajes */}
      <div className="row">
        {character ? (
          <div className="col-md-4" key={character.id}>
            <CharacterCard character={character} />
          </div>
        ) : characters.length > 0 ? (
          characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <CharacterCard character={character} />
            </div>
          ))
        ) : (
          <p className="text-center">No se encontraron personajes</p>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
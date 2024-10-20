# Proyecto 5 Bootcamp UDD - REACT + VITE
El objetivo del Proyecto 5 es implementar un proyecto usando REACT + VITE invocando una API Pública.

## API Pública
La API Pública usada en el ejercicio corresponde al listado de personajes de la película Harry Potter (https://hp-api.onrender.com).

## Estructura del proyecto
De acuerdo con las prácticas del curso, el proyecto se ha estructurado de la siguiente forma:
![Captura de pantalla 2024-10-20 a la(s) 16 29 27](https://github.com/user-attachments/assets/38beac70-5a29-47c6-9be3-1d4ea7c68be1)

![Captura de pantalla 2024-10-20 a la(s) 16 32 02](https://github.com/user-attachments/assets/9921646a-a26f-4025-87a4-3a4b57b96df1)

## Invocando la API Pública
Se desarrollan dos funciones para invocar los personajes (/services/ApiHarryPotter.js). En la función `fetchHarryPotterCharacters` se invocan todos los personajes, mientras que en `fetchHarryPotterCharacterById` se invoca sólo el personaje por el ID

```javascript
const API_URL = 'https://hp-api.herokuapp.com/api/characters';
const API_URL_BY_ID = 'https://hp-api.herokuapp.com/api/character';

// Función para obtener todo el listado de personajes disponibles
export const fetchHarryPotterCharacters = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al buscar los personajes, la paraste de pecho colorado garka.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error buscando los personajes:', error);
    throw error;
  }
};

// Función para obtener un personaje por ID
export const fetchHarryPotterCharacterById = async (id) => {
  try {
    const response = await fetch(`${API_URL_BY_ID}/${id}`);
    if (!response.ok) {
      throw new Error(`Error al buscar al personaje por ID: ${id}`);
    }
    const data = await response.json();
    console.log('Error al buscar al personaje por ID:', data); // Imprimir el JSON en la consola
    return data;
  } catch (error) {
    console.error(`Error buscando al personaje por ID ${id}:`, error);
    throw error;
  }
};

```
## Manejo de estados en Hooks
Para el manejo de los estados para la obtención tanto de todos los personajes, como para el personaje obtenido por ID, se definen los hooks `/hooks/useFetchCharacters.js` y `/hooks/useFetchCharacterById.js`. Lo destacable en este caso, es que se controlan los estados que permiten agregar el arreglo del objeto de personajes y objeto de personaje (para el caso por ID) y el error.

### useFetchCharacters.js
```javascript
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
```
### useFetchCharacterById.js
```javascript
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
```
## Comonentes
Para la UI de la página, tendremos dos componentes `/components/CharacterList.jsx` y `/components/CharacterCard.jsx`. En el componente CharacterList tendremos el despliegue completo de la página, mientras que en CharacterCard.jsx tendremos el despliegue puntual de la tarjeta del personaje. Con lo anterior, podremos reutilizar dicho componente para volcar o actualizar el resultado del objeto personaje de forma eficiente.

### CharacterList.jsx
```javascript
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
```

### CharacterList.jsx
```javascript
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
```

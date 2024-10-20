# Proyecto 5 Bootcamp UDD - REACT + VITE
El objetivo del Proyecto 5 es implementar un proyecto usando REACT + VITE invocando una API Pública.

## API Pública
La API Pública usada en el ejercicio corresponde al listado de personajes de la película Harry Potter (https://hp-api.onrender.com).

## Estructura del proyecto
De acuerdo con las prácticas del curso, el proyecto se ha estructurado de la siguiente forma:
![Captura de pantalla 2024-10-20 a la(s) 16 29 27](https://github.com/user-attachments/assets/38beac70-5a29-47c6-9be3-1d4ea7c68be1)

![Captura de pantalla 2024-10-20 a la(s) 16 32 02](https://github.com/user-attachments/assets/9921646a-a26f-4025-87a4-3a4b57b96df1)

## Invocando la API Pública
Se desarrollan dos funciones para invocar los personajes. En la función `fetchHarryPotterCharacters` se invocan todos los personajes, mientras que en `fetchHarryPotterCharacterById` se invoca sólo el personaje por el ID

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

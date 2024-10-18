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
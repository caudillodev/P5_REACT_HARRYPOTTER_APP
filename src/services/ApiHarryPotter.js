export const fetchCharacters = async () => {
    try {
      const response = await fetch('https://hp-api.herokuapp.com/api/characters');
      if (!response.ok) throw new Error('Error obteniendo los datos.');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error obteniendo los personajes:", error);
      throw error;
    }
  };
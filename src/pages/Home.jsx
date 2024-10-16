import React from 'react';
import CharacterList from '../components/CharacterList';

const Home = () => (
  <div className="container">
    <h1 className="text-center my-4">Personajes de Harry Potter</h1>
    <CharacterList />
  </div>
);

export default Home;
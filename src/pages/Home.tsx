// pages/Home.tsx
import React, { useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../Data/PokemonContext';

function Home() {
  const { pokemonList, loadMorePokemon, loading, hasMore } = usePokemon();

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50 || loading || !hasMore) return;
    loadMorePokemon();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {pokemonList && pokemonList.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default Home;

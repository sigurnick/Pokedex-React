/* eslint-disable @typescript-eslint/no-explicit-any */
// context/PokemonContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Pokemon } from '../Interfaces/Pokemon';
interface PokemonContextType {
  pokemonList: Pokemon[];
  loadMorePokemon: () => void;
  getPokemonById: (id:number) => any
  getPokemonSpeciesById: (id:number) => any
  loading: boolean;
  hasMore: boolean;
  typeColorsBg: any
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const typeColorsBg: { [key: string]: string } = {
    normal: "bg-normal",
    fire: "bg-fire",
    water: "bg-water",
    electric: "bg-electric",
    grass: "bg-grass",
    ice: "bg-ice",
    fighting: "bg-fighting",
    poison: "bg-poison",
    ground: "bg-ground",
    flying: "bg-flying",
    psychic: "bg-psychic",
    bug: "bg-bug",
    rock: "bg-rock",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    steel: "bg-steal",
    fairy: "bg-fairy",
  };

  useEffect(() => {
    const fetchPokemonList = async () => {      if (loading) return; // Prevenzione del doppio caricamento
      setLoading(true);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`);
        const responseData = await response.json();
        const pokemonList = responseData.results || [];
        console.log(pokemonList);

        const pokemonDetailsPromises = pokemonList.map(async (pokemon: { name: string, url: string }) => {
          try {
            const responsePokemon = await fetch(pokemon.url);
            if (!responsePokemon.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            return await responsePokemon.json();
          } catch (error) {
            console.error(`Error fetching details for ${pokemon.name}:`, error);
            return null; // Restituisci null in caso di errore
          }
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        console.log(pokemonDetails);

        setPokemonList(prev => [...prev, ...pokemonDetails.filter(p => p !== null)]);

        // Controlla se ci sono più Pokémon da caricare
        if (responseData.results.length < 50) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [offset]);

  const loadMorePokemon = () => {
    if (!loading && hasMore) {
      setOffset(prevOffset => prevOffset + 50);
    }
  };

  const getPokemonById = async (id: number) => {
    const pokemonInData = pokemonList.find(pokemon => pokemon.id === id);
    if (pokemonInData) {
      return pokemonInData
    } else {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const responseData = await response.json();
        return responseData
      } catch (error) {
        console.log('Error getting pokemon info',error);  
      } 
    }
  };

  const getPokemonSpeciesById = async (id: number) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        const responseData = await response.json();
        return responseData
      } catch (error) {
        console.log('Error getting pokemon species',error);  
      } 
    
  };

  return (
    <PokemonContext.Provider value={{ pokemonList, loadMorePokemon, loading, hasMore, getPokemonById, getPokemonSpeciesById, typeColorsBg}}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

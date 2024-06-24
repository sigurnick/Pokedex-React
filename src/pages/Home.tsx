import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../Interfaces/Pokemon";

function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      if (loading) return; // Prevenzione del doppio caricamento
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
        
 
        setPokemonList(prev => [...prev, ...pokemonDetails]);
        
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

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50 || loading || !hasMore) return;
    setOffset(prevOffset => prevOffset + 50);
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

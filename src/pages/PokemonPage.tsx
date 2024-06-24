import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../Interfaces/Pokemon";

function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const params = useParams<{ pokemonId: string }>();
  console.log(params);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}/`
        );
        const responseData = await response.json();
        setPokemon(responseData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemonDetail();
  }, [params.pokemonId]);
  return <div>{pokemon?.name}</div>;
}

export default PokemonPage;

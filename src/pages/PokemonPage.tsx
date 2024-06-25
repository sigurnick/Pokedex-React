import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../Interfaces/Pokemon";
import { usePokemon } from "../Data/PokemonContext";

function PokemonPage() {

  const { getPokemonById } = usePokemon();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const params = useParams<{ pokemonId: string }>();

  useEffect(() => {
    const pokemon = getPokemonById(parseInt(params.pokemonId!))
    setPokemon(pokemon)
    console.log(pokemon);
    
  }, [params.pokemonId]);

  return <div>
    {pokemon?.name}
  </div>
}

export default PokemonPage;

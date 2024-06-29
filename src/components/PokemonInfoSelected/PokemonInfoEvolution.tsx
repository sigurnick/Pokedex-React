import { Pokemon } from "../../Interfaces/Pokemon";
interface PokemonProps {
    pokemon: Pokemon;
}

function PokemonInfoEvolution({pokemon}: PokemonProps) {
    return ( <div className="text-black ">{pokemon.stats[0].base_stat}</div>  );
}

export default PokemonInfoEvolution;
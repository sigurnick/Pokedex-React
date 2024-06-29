import { PokemonSpecies } from "../../Interfaces/PokemonSpecies";
interface PokemonSpeciesProps {
    pokemonSpecies: PokemonSpecies;
}

function PokemonInfoAbout({pokemonSpecies}: PokemonSpeciesProps) {
    return ( <div className="text-black ">{pokemonSpecies?.flavor_text_entries[6].flavor_text}</div>  );
}

export default PokemonInfoAbout;
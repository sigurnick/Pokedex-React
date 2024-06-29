import { Pokemon } from "../../Interfaces/Pokemon";
interface PokemonProps {
  pokemon: Pokemon;
  pokemonColor: string;
}

function PokemonInfoStats({ pokemon, pokemonColor }: PokemonProps) {
  const StatBar = ({ value }: { value: number }) => {
    const percentage = (Math.min(Math.max(value, 0), 100) / 100) * 100;

    return (
      <div
        style={{
          backgroundColor: "#d3d3d3",
          borderRadius: "0.25rem",
          height: "8px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: pokemonColor,
            borderRadius: "0.25rem",
            height: "100%",
          }}
        ></div>
      </div>
    );
  };

  const Stat = ({ index, nameStat }: { index: number; nameStat: string }) => {
    return (
      <div className="flex gap-2 justify-start items-center">
        <div className="w-44 text-left">{nameStat}</div>
        <div className="w-16 font-bold">{pokemon.stats[index].base_stat}</div>
        <StatBar value={pokemon.stats[index].base_stat}></StatBar>
      </div>
    );
  };

  return (
    <div className="text-black w-full ">
      {/* HP */}
      <Stat index={0} nameStat={"Hp"}></Stat>

      {/* ATTACK */}
      <Stat index={1} nameStat={"Attack"}></Stat>

      {/* DEFENSE */}
      <Stat index={2} nameStat={"Defense"}></Stat>

      {/* SPECIAL ATTACK */}
      <Stat index={3} nameStat={"Sp. Attack"}></Stat>

      {/* SPECIAL DEFENSE */}
      <Stat index={4} nameStat={"Sp. Defense"}></Stat>

      {/* SPEED */}
      <Stat index={5} nameStat={"Speed"}></Stat>
    </div>
  );
}

export default PokemonInfoStats;

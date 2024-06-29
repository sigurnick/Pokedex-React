import { useEffect, useState } from "react";
import { Pokemon } from "../Interfaces/Pokemon";
import { FastAverageColor } from "fast-average-color";
import { Link, useNavigate } from "react-router-dom";
import { usePokemon } from "../Data/PokemonContext";

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { getPokemonTypeIcon } = usePokemon();

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"].front_default || "";
  const [bgColor, setBgColor] = useState("");
  const typeColors: { [key: string]: string } = {
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
  const navigate = useNavigate()

  useEffect(() => {
    const fac = new FastAverageColor();

    fac
      .getColorAsync(imageUrl)
      .then((color) => {
        setBgColor(color.rgb);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  function handleCardClick(id:number) {
    navigate(`/pokemon/${id}`)
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatPokemonId(id: number) {
    return id.toString().padStart(3, "0");
  }

  return (
    <div
      className="w-full rounded flex items-center justify-between  gap-3 hover:cursor-pointer hover:scale-105 transition-all"
      style={{ backgroundColor: bgColor }}
      onClick={() => handleCardClick(pokemon.id)}
    >
       <Link key={pokemon.id} to={`/pokemon/${pokemon.id.toString()}`}></Link>

      <div className="flex flex-col gap-2  pl-4">
        {/* ID - Name - Star */}
        <div className="flex justify-around items-center gap-8 text-xl tracking-wide font-semibold">
          <div>#{formatPokemonId(pokemon.id)} </div>
          <div>{capitalizeFirstLetter(pokemon.name)}</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
        </div>

        {/* Type */}
        <div className="flex gap-2 text-base">
          {pokemon.types.map((type) => (
            <div
              key={type.type.name}
              className={`${
                typeColors[type.type.name] || "bg-gray-300"
              } py-1 px-4 rounded flex items-center gap-1 justify-center`}
            > 
            <span className="w-3 h-3">
            {getPokemonTypeIcon(type.type.name)}
            </span>
              {type.type.name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* IMG */}
      <div className="bg-transparent h-full rounded-s-full pr-2 pl-6 py-2">
        {imageUrl ? (
          <img className="h-28 w-28" src={imageUrl} alt={pokemon.name} />
        ) : (
          <p>No image available</p>
        )}
      </div>
    </div>
  );
}
export default PokemonCard;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../Interfaces/Pokemon";
import { usePokemon } from "../Data/PokemonContext";
import { FastAverageColor } from "fast-average-color";
import { PokemonSpecies } from "../Interfaces/PokemonSpecies";
import { PokemonInfoSelected } from "../Interfaces/PokemonInfoSelected";
import PokemonInfoAbout from "../components/PokemonInfoSelected/PokemonInfoAbout";
import PokemonInfoStats from "../components/PokemonInfoSelected/PokemonInfoStats";
import PokemonInfoMoves from "../components/PokemonInfoSelected/PokemonInfoMoves";
import PokemonInfoEvolution from "../components/PokemonInfoSelected/PokemonInfoEvolution";

function PokemonPage() {
  const { getPokemonById, typeColorsBg, getPokemonSpeciesById } = usePokemon();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
  const [bgColor, setBgColor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [infoSelected, setInfoSelected] = useState<PokemonInfoSelected>(
    PokemonInfoSelected.ABOUT
  );
  const params = useParams<{ pokemonId: string }>();

  useEffect(() => {
    const fetchPkemon = async () => {
      if (params.pokemonId) {
        const pokemonId: number = parseInt(params.pokemonId);
        const pokemon = await getPokemonById(pokemonId);
        const pokemonSpecies = await getPokemonSpeciesById(pokemonId);
        setPokemon(pokemon);
        setPokemonSpecies(pokemonSpecies);
        setImageUrl(
          pokemon?.sprites.other?.["official-artwork"].front_default || ""
        );
        console.log(pokemon);
      }
    };
    fetchPkemon();
  }, [getPokemonById, params.pokemonId]);

  useEffect(() => {
    const fac = new FastAverageColor();

    if (imageUrl) {
      fac
        .getColorAsync(
          pokemon?.sprites.other?.["official-artwork"].front_default || ""
        )
        .then((color) => {
          setBgColor(color.rgb);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [imageUrl]);

  const changeInfoSelected = (infoSelected: PokemonInfoSelected) => {
    setInfoSelected(infoSelected);
  };

  const getComponentSelected = () => {
    let content;

    switch (infoSelected) {
      case PokemonInfoSelected.ABOUT:
        content = <PokemonInfoAbout pokemonSpecies={pokemonSpecies!} />;
        break;
      case PokemonInfoSelected.STATS:
        content = <PokemonInfoStats pokemon={pokemon!} />;
        break;
      case PokemonInfoSelected.MOVES:
        content = <PokemonInfoMoves pokemon={pokemon!} />;
        break;
      case PokemonInfoSelected.EVOLUTION:
        content = <PokemonInfoEvolution pokemon={pokemon!} />;
        break;
    }
    return content;
  };

  function formatPokemonId(id: number) {
    return id.toString().padStart(3, "0");
  }
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      {/* -------- TOP SECTION ------- */}
      <div className="bg-gray-100  h-[400px] w-full">
        <div
          style={{ backgroundColor: bgColor }}
          className="h-[260px] w-full rounded-b-[20%] flex flex-col"
        >
          {/* Back arrow - pokemon id - hearth */}
          <div className="flex justify-between px-4 pt-4 ">
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>

            {pokemon?.id ? (
              <div className="text-xl pt-4">
                #{formatPokemonId(pokemon?.id)}
              </div>
            ) : (
              <div className="text-xl pt-8">###</div>
            )}
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>

          {/* IMG */}
          <div className="flex justify-center">
            {imageUrl && pokemon ? (
              <img className="h-56 w-56" src={imageUrl} alt={pokemon.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          {pokemon && pokemon.name ? (
            <div className="fles justify-center pt-8 text-2xl text-black font-bold">
              {capitalizeFirstLetter(pokemon.name)}
            </div>
          ) : (
            <div className="fles justify-center pt-8 text-2xl text-black font-bold">
              ...
            </div>
          )}

          {/* Type */}
          {typeColorsBg ? (
            <div className="flex gap-2 text-base">
              {pokemon?.types.map((type) => (
                <div
                  key={type.type.name}
                  className={`${
                    typeColorsBg[type.type.name] || "bg-gray-300"
                  } py-1 px-4 rounded-xl`}
                >
                  {type.type.name.toUpperCase()}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* -------- INFO SECTION -------- */}
      <div className="w-full bg-white rounded-t-xl p-2 mt-4">
        {/* Static menu */}
        <div className="flex justify-center gap-6 text-black font-semibold text-xl">
          <button
            className="border-b-2 hover:cursor-pointer hover:border-black"
            onClick={() => changeInfoSelected(PokemonInfoSelected.ABOUT)}
          >
            About
          </button>
          <button
            className="border-b-2 hover:cursor-pointer hover:border-black"
            onClick={() => changeInfoSelected(PokemonInfoSelected.STATS)}
          >
            Stats
          </button>
          <button
            className="border-b-2 hover:cursor-pointer hover:border-black"
            onClick={() => changeInfoSelected(PokemonInfoSelected.MOVES)}
          >
            Moves
          </button>
          <button
            className="border-b-2 hover:cursor-pointer hover:border-black"
            onClick={() => changeInfoSelected(PokemonInfoSelected.EVOLUTION)}
          >
            Evolution
          </button>
        </div>

        {/* Dynamic component selected */}
        <div className="p-2">{getComponentSelected()}</div>
      </div>
    </div>
  );
}

export default PokemonPage;

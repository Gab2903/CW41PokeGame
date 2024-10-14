import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=250");
        const data = await res.json();

        const pokemonData = data.results.map((pok) =>
          fetch(pok.url).then((res) => res.json())
        );

        setPokemons(await Promise.all(pokemonData));
      } catch (error) {
        console.error("Error fetching Pokemons:", error);
      }
    };

    fetchPokemonDetails();
  }, []);

  const handleCardClick = (pokemon) => {
    navigate(`/battle/${pokemon.id}`, { state: { selectedPokemon: pokemon } });
  };

  return (
    <div className="p-4">
      <h1 className="flex p-4 justify-center text-[#d5c3aa] font-bold">
        Pokemons of all kind
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="bg-gray-800 text-[#d5c3aa] rounded-lg shadow-lg p-4 flex flex-col items-center text-center cursor-pointer hover:bg-slate-700"
            onClick={() => handleCardClick(pokemon)}
          >
            {pokemon.sprites && (
              <img
                src={pokemon.sprites.other.showdown.front_shiny}
                alt={pokemon.name}
                className="max-w-full h-72 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold">{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

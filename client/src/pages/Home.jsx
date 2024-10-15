import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokeDetails from "../components/PokeDetails";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [roster, setRoster] = useState(
    () => JSON.parse(localStorage.getItem("pokemonRoster")) || []
  );
  const [maxReached, setMaxReached] = useState(false); // max 10 Pokémon ausgewählt
  const [username, setUsername] = useState(""); // Username aus localStorage
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
    if (roster.length >= 10) {
      setMaxReached(true); // Max. Pokémon Meldung
      return;
    }
    if (!roster.some((p) => p.id === pokemon.id)) {
      const updatedRoster = [...roster, pokemon];
      setRoster(updatedRoster);
      localStorage.setItem("pokemonRoster", JSON.stringify(updatedRoster)); // Speichere Pokémon in local
    }
  };

  const handleMouseEnter = (pokemon) => {
    setHoveredPokemon(pokemon);
  };

  const handleMouseLeave = () => {
    setHoveredPokemon(null);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveUsername = () => {
    // Hole das Array von Nutzern aus dem localStorage oder erzeuge ein leeres Array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Erstelle einen neuen User mit dem username und score = 0
    const newUser = {
      username: username,
      score: 0,
    };

    // Füge den neuen User dem Array hinzu
    users.push(newUser);

    // Speichere das aktualisierte Array im localStorage
    localStorage.setItem("users", JSON.stringify(users));

    console.log("User hinzugefügt:", newUser);
  };

  const goToRoster = () => {
    navigate("/roster");
  };

  return (
    <div className="p-8 relative">
      <h1 className="flex p-6 justify-center text-[#d5c3aa] font-bold">
        Battle Pokèmons
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Playername"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleSaveUsername}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={goToRoster}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Your Pokémon Roster
        </button>
      </div>

      {/* Meldung wenn 10 Pokémon ausgewählt wurde */}
      {maxReached && (
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 text-white px-4 py-2 rounded">
            You can only choose 10 Pokémon!
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full">
        {pokemons.map((pokemon, index) => {
          const isSelected = roster.some((p) => p.id === pokemon.id); // Checke ob das Pokémon schpn ausgewählt ist

          return (
            <div
              key={index}
              className={`${
                isSelected ? "bg-green-500" : "bg-gray-800"
              } text-[#d5c3aa] rounded-lg shadow-lg p-4 flex flex-col items-center text-center cursor-pointer hover:bg-slate-700 relative`}
              onClick={() => handleCardClick(pokemon)}
              onMouseEnter={() => handleMouseEnter(pokemon)}
              onMouseLeave={handleMouseLeave}
            >
              {pokemon.sprites && (
                <img
                  src={pokemon.sprites.other.showdown.front_shiny}
                  alt={pokemon.name}
                  className="max-w-full h-55 object-cover rounded-t-lg mb-6"
                />
              )}
              <h3 className="text-xl font-semibold capitalize">
                {pokemon.name}
              </h3>
              {hoveredPokemon === pokemon && <PokeDetails pokemon={pokemon} />}
              {isSelected && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 rounded-bl-lg">
                  Selected
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

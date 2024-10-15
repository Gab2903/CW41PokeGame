// *BONUS* My Roster Page: Display the list of Pokemon the user has selected. Include an option to remove Pokemon from the roster. You can either persist this to localStorage or to the database.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Roster = () => {
  const [roster, setRoster] = useState(
    () => JSON.parse(localStorage.getItem("pokemonRoster")) || []
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  ); // PLayername aus dem localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoster =
      JSON.parse(localStorage.getItem("pokemonRoster")) || [];
    setRoster(storedRoster);
  }, []);

  const handleRemovePokemon = (id) => {
    const updatedRoster = roster.filter((pokemon) => pokemon.id !== id);
    setRoster(updatedRoster);
    localStorage.setItem("pokemonRoster", JSON.stringify(updatedRoster)); // Update local
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="p-8">
      {/* Playername in Headline anzeigen */}
      <h1 className="flex p-6 justify-center text-[#d5c3aa] font-bold">
        Pokémon Roster of {username}
      </h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={goToHome}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Home
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full">
        {roster.length > 0 ? (
          roster.map((pokemon, index) => {
            const hp = pokemon.stats.find(
              (stat) => stat.stat.name === "hp"
            )?.base_stat;
            const attack = pokemon.stats.find(
              (stat) => stat.stat.name === "attack"
            )?.base_stat;
            const defense = pokemon.stats.find(
              (stat) => stat.stat.name === "defense"
            )?.base_stat;

            return (
              <div
                key={index}
                className="bg-gray-800 text-[#d5c3aa] rounded-lg shadow-lg p-4 flex flex-col items-center text-center relative"
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
                <div className="mt-4">
                  <p>
                    <strong>HP:</strong> {hp}
                  </p>
                  <p>
                    <strong>Attack:</strong> {attack}
                  </p>
                  <p>
                    <strong>Defense:</strong> {defense}
                  </p>
                </div>

                {/* löschen aus Roster */}
                <button
                  onClick={() => handleRemovePokemon(pokemon.id)}
                  className="bg-red-500 text-white px-2 py-1 mt-4 rounded"
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-white">
            Your Pokémon Roster is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Roster;

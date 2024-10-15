import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Roster = () => {
  const [roster, setRoster] = useState(
    () => JSON.parse(localStorage.getItem("pokemonRoster")) || []
  );
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedRoster =
      JSON.parse(localStorage.getItem("pokemonRoster")) || [];
    setRoster(storedRoster);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length > 0) {
      const lastUsername = users[users.length - 1].username;
      setUsername(lastUsername);
    } else {
      setUsername("Guest");
    }
  }, []);

  const handleRemovePokemon = (id) => {
    const updatedRoster = roster.filter((pokemon) => pokemon.id !== id);
    setRoster(updatedRoster);
    localStorage.setItem("pokemonRoster", JSON.stringify(updatedRoster));
  };

  const handleSelectPokemon = (pokemon) => {
    navigate("/battle", { state: { selectedPokemon: pokemon } });
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="p-8">
      <h1 className="flex p-6 justify-center text-[#d5c3aa] font-bold">
        Pokémon Roster of: {username || "Guest"}
      </h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={goToHome}
          className="bg-gray-500 text-white px-4 py-2 rounded"
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

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleSelectPokemon(pokemon)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleRemovePokemon(pokemon.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
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

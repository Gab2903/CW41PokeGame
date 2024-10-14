import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BattlePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPokemon } = location.state || {};
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [loser, setLoser] = useState(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        const data = await res.json();
        setRandomPokemon(data);
      } catch (error) {
        console.error("Error fetching random Pokémon:", error);
      }
    };

    fetchRandomPokemon();
  }, []);

  const getStats = (pokemon) => {
    return pokemon.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {});
  };

  const selectedStats = selectedPokemon ? getStats(selectedPokemon) : {};
  const randomStats = randomPokemon ? getStats(randomPokemon) : {};

  const handleFight = () => {
    const selectedHP = selectedStats.hp;
    const randomHP = randomStats.hp;
    const hpDifference = Math.abs(selectedHP - randomHP);
    const winner = selectedHP > randomHP ? selectedPokemon : randomPokemon;
    const loserPokemon =
      selectedHP > randomHP ? randomPokemon : selectedPokemon;

    localStorage.setItem("hpDifference", hpDifference);

    setBattleResult(winner);
    setLoser(loserPokemon);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 mx-4 my-4">
      <h1 className="text-4xl font-bold mb-6 mb-16">Let's Fight!</h1>
      <div className="flex flex-col items-center justify-between w-full max-w-screen-xl mx-auto">
        {!battleResult ? (
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {selectedPokemon && (
              <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center w-full md:w-1/2 lg:w-1/3 transform transition-transform duration-300 scale-100">
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedPokemon.name}
                </h2>
                <img
                  src={selectedPokemon.sprites.other.showdown.front_shiny}
                  alt={selectedPokemon.name}
                  className="w-60 h-60 mb-4 rounded-full border-4 border-yellow-500"
                />
                <div className="text-lg font-semibold mb-2">Stats:</div>
                <div className="text-sm">
                  <p>HP: {selectedStats.hp}</p>
                  <p>Attack: {selectedStats.attack}</p>
                  <p>Defense: {selectedStats.defense}</p>
                </div>
              </div>
            )}
            <div className="text-4xl font-bold text-yellow-500 my-4 md:my-0">
              VS
            </div>
            {randomPokemon && (
              <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center w-full md:w-1/2 lg:w-1/3 transform transition-transform duration-300 scale-100">
                <h2 className="text-2xl font-semibold mb-2">
                  {randomPokemon.name}
                </h2>
                <img
                  src={randomPokemon.sprites.other.showdown.front_shiny}
                  alt={randomPokemon.name}
                  className="w-60 h-60 mb-4 rounded-full border-4 border-green-500"
                />
                <div className="text-lg font-semibold mb-2">Stats:</div>
                <div className="text-sm">
                  <p>HP: {randomStats.hp}</p>
                  <p>Attack: {randomStats.attack}</p>
                  <p>Defense: {randomStats.defense}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform duration-500 scale-125`}
          >
            <h2 className="text-3xl font-semibold mb-2">
              {battleResult.name} Wins!
            </h2>
            <img
              src={battleResult.sprites.other.showdown.front_shiny}
              alt={battleResult.name}
              className="w-72 h-72 mb-4 rounded-full border-4 border-yellow-500"
            />
            <div className="text-lg font-semibold mb-2">Stats:</div>
            <div className="text-sm">
              <p>
                HP:{" "}
                {selectedStats.hp > randomStats.hp
                  ? selectedStats.hp
                  : randomStats.hp}
              </p>
              <p>
                Attack:{" "}
                {selectedStats.attack > randomStats.attack
                  ? selectedStats.attack
                  : randomStats.attack}
              </p>
              <p>
                Defense:{" "}
                {selectedStats.defense > randomStats.defense
                  ? selectedStats.defense
                  : randomStats.defense}
              </p>
            </div>
            <button
              className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => navigate(-1)}
            >
              Close
            </button>
          </div>
        )}
      </div>
      {!battleResult && (
        <button
          className="mt-8 bg-gray-500 hover:bggray-600 text-white font-semibold py-2 px-6 rounded"
          onClick={handleFight}
        >
          Fight
        </button>
      )}
    </div>
  );
};

export default BattlePage;

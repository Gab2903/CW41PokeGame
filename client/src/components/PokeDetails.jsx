//Pokemon Details: Display detailed information about a selected Pokemon (e.g., stats, types, abilities). Include a button to add the Pokemon to the user’s roster.
import React from "react";

const PokeDetails = ({ pokemon }) => {
  if (!pokemon) return null;

  const hp = pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat;
  const attack = pokemon.stats.find(
    (stat) => stat.stat.name === "attack"
  )?.base_stat;
  const defense = pokemon.stats.find(
    (stat) => stat.stat.name === "defense"
  )?.base_stat;

  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg shadow-lg absolute z-10 w-64">
      <h2 className="text-lg font-bold capitalize mb-2">{pokemon.name}</h2>
      <img
        src={pokemon.sprites?.other?.showdown?.front_shiny}
        alt={pokemon.name}
        className="w-32 h-32 object-cover mx-auto"
      />
      <div className="mt-4">
        <p>
          <strong>Height:</strong> {pokemon.height / 10} m
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight / 10} kg
        </p>
        <p>
          <strong>Base Experience:</strong> {pokemon.base_experience}
        </p>
        <p>
          <strong>Types:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
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
    </div>
  );
};

export default PokeDetails;

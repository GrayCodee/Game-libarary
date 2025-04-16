import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import axios from "axios";

const Index = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:44385/api/games/GetGames")
      .then((response) => {
        setGames(response.data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Games...</p>;
  return (
    <div className="min-h-screen bg-game-dark">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Featured Games
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

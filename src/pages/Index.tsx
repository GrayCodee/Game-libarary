
import React from "react";
import GameCard from "../components/GameCard";
import { games } from "../data/games";

const Index = () => {
  return (
    <div className="min-h-screen bg-game-dark">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Featured Games</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {games.slice(0, 3).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

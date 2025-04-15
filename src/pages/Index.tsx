
import React, { useState } from "react";
import GameCard from "../components/GameCard";
import { games } from "../data/games";
import { GameCategory } from "../types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories: { value: GameCategory | "all"; label: string }[] = [
  { value: "all", label: "All Games" },
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "rpg", label: "RPG" },
  { value: "strategy", label: "Strategy" },
  { value: "simulation", label: "Simulation" },
  { value: "sports", label: "Sports" },
  { value: "puzzle", label: "Puzzle" },
  { value: "racing", label: "Racing" },
  { value: "fighting", label: "Fighting" },
  { value: "shooter", label: "Shooter" },
  { value: "horror", label: "Horror" },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | "all">("all");

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-game-dark">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Game Library</h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 bg-game-dark-light border-gray-700"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 md:gap-3 md:justify-end">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category.value
                      ? "bg-game-purple text-white"
                      : "bg-game-dark-light text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No games found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

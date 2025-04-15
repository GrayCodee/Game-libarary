
import React from "react";
import { Link } from "react-router-dom";
import { Game } from "../types";
import PlatformIcon from "./PlatformIcon";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="block bg-game-card rounded-xl overflow-hidden game-card-shadow game-card-hover transition-transform duration-300"
    >
      <div className="relative aspect-[4/3]">
        <img 
          src={game.coverImage} 
          alt={`${game.title} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {game.platforms.map((platform) => (
            <span 
              key={platform} 
              className="bg-black/80 p-2 rounded-lg backdrop-blur-sm"
            >
              <PlatformIcon platform={platform} className="text-white w-6 h-6" />
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <Badge 
          variant="outline" 
          className="mb-3 text-game-purple border-game-purple text-sm"
        >
          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
        </Badge>
        <h3 className="text-2xl font-bold mb-3 text-white">{game.title}</h3>
        <p className="text-base text-gray-300 line-clamp-3">{game.description}</p>
      </div>
    </Link>
  );
};

export default GameCard;

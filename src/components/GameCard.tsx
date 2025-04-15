
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
      className="block bg-game-card rounded-lg overflow-hidden game-card-shadow game-card-hover"
    >
      <div className="relative aspect-[16/9]">
        <img 
          src={game.coverImage} 
          alt={`${game.title} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {game.platforms.map((platform) => (
            <span 
              key={platform} 
              className="bg-black/70 p-1 rounded-md backdrop-blur-sm"
            >
              <PlatformIcon platform={platform} className="text-white" />
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <Badge 
          variant="outline" 
          className="mb-2 text-game-purple border-game-purple"
        >
          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
        </Badge>
        <h3 className="text-xl font-bold mb-2 text-white">{game.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{game.description}</p>
      </div>
    </Link>
  );
};

export default GameCard;

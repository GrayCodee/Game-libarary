
import React from "react";
import { useParams, Link } from "react-router-dom";
import { games } from "../data/games";
import VideoPlayer from "../components/VideoPlayer";
import PlatformIcon from "../components/PlatformIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-game-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game not found</h1>
          <Link to="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-game-card rounded-lg overflow-hidden shadow-lg">
              <img
                src={game.coverImage}
                alt={`${game.title} cover`}
                className="w-full h-64 object-cover"
              />
            </div>

            {game.videoUrl && (
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Game Trailer</h2>
                <VideoPlayer videoUrl={game.videoUrl} />
              </div>
            )}

            <div className="bg-game-card rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-3">About the Game</h2>
              <p className="text-gray-300 whitespace-pre-line">{game.longDescription || game.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-game-card rounded-lg p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-game-purple border-game-purple">
                  {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                </Badge>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-white mb-2">Platforms</h2>
                <div className="flex flex-wrap gap-3">
                  {game.platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center bg-game-dark-light px-3 py-1 rounded-md"
                    >
                      <PlatformIcon platform={platform} className="text-game-purple mr-2" />
                      <span className="text-sm text-gray-300">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {(game.releaseDate || game.developer || game.publisher) && (
                <div className="border-t border-gray-700 pt-4">
                  <dl className="space-y-3">
                    {game.releaseDate && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Release Date</dt>
                        <dd className="text-white">
                          {new Date(game.releaseDate).toLocaleDateString()}
                        </dd>
                      </div>
                    )}
                    {game.developer && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Developer</dt>
                        <dd className="text-white">{game.developer}</dd>
                      </div>
                    )}
                    {game.publisher && (
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Publisher</dt>
                        <dd className="text-white">{game.publisher}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;

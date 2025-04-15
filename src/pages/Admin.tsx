
import React, { useState } from "react";
import { games as gamesData } from "../data/games";
import { Game } from "../types";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GameForm from "../components/GameForm";
import PlatformIcon from "../components/PlatformIcon";
import { toast } from "sonner";

const Admin = () => {
  const [games, setGames] = useState<Game[]>(gamesData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);

  const handleAddGame = (newGame: Game) => {
    setGames([...games, newGame]);
    setIsAddDialogOpen(false);
    toast.success("Game added successfully!");
  };

  const handleEditGame = (updatedGame: Game) => {
    setGames(games.map((game) => (game.id === updatedGame.id ? updatedGame : game)));
    setIsEditDialogOpen(false);
    toast.success("Game updated successfully!");
  };

  const handleDeleteGame = () => {
    if (selectedGame) {
      setGames(games.filter((game) => game.id !== selectedGame.id));
      setIsDeleteDialogOpen(false);
      toast.success("Game deleted successfully!");
    }
  };

  const openEditDialog = (game: Game) => {
    setSelectedGame(game);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (game: Game) => {
    setSelectedGame(game);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-game-dark">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Game Management</h1>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-game-purple hover:bg-game-purple-dark"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Game
          </Button>
        </div>

        <div className="bg-game-card rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-game-dark-light border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Game
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Platforms
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {games.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-16 flex-shrink-0">
                          <img
                            className="h-10 w-16 rounded object-cover"
                            src={game.coverImage}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{game.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300 capitalize">{game.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {game.platforms.map((platform) => (
                          <PlatformIcon key={platform} platform={platform} className="text-gray-300" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(game)}
                        className="text-gray-300 hover:text-white mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(game)}
                        className="text-gray-300 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Game Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Game</DialogTitle>
            </DialogHeader>
            <GameForm
              onSubmit={handleAddGame}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Game Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Game</DialogTitle>
            </DialogHeader>
            <GameForm
              game={selectedGame}
              onSubmit={handleEditGame}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {selectedGame?.title}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteGame}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Admin;

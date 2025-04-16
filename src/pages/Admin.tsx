import React, { useState, useEffect } from "react";
import { Game } from "../types";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter, // Make sure this is included
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

//import PlatformIcon from "../components/PlatformIcon";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined);

  // Fetch games from the API on component mount
  useEffect(() => {
    axios
      .get("https://localhost:44385/api/games/GetGames")
      .then((resposne) => {
        setGames(resposne.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDeleteGame = async () => {
    if (selectedGame) {
      // Optimistically remove the game from the UI
      const updatedGames = games.filter((game) => game.id !== selectedGame.id);
      setGames(updatedGames);
      setIsDeleteDialogOpen(false);

      try {
        const response = await axios.delete(
          `https://localhost:44385/api/games/DeleteGame/${selectedGame.id}`
        );

        toast.success("Game deleted successfully!");
      } catch (error) {
        toast.error("Error occurred while deleting the game.");
        setGames(games); // Revert the optimistic update on error
      }
    }
  };

  // Open the delete dialog with the selected game
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
            onClick={() => navigate("/admin/add")}
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
                  <tr
                    key={game.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-16 flex-shrink-0">
                          <img
                            className="h-10 w-16 rounded object-cover"
                            src={game.imageUrl}
                            alt={game.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {game.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300 capitalize">
                        {game.categoryName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {game.gameDevice.map((gameDevice) => (
                          <p>{gameDevice}</p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/edit/${game.id}`)}
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

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {selectedGame?.title}. This action
                cannot be undone.
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

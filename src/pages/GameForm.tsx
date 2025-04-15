
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Game } from '../types';
import { games as gamesData } from '../data/games';
import GameFormComponent from '../components/GameFormComponent';
import { toast } from 'sonner';

const GameFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const game = id ? gamesData.find(g => g.id === id) : undefined;

  const handleSubmit = (updatedGame: Game) => {
    toast.success(`Game ${game ? 'updated' : 'added'} successfully!`);
    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-game-dark p-6">
      <div className="max-w-4xl mx-auto bg-game-card rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          {game ? 'Edit Game' : 'Add New Game'}
        </h1>
        <GameFormComponent
          game={game}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default GameFormPage;

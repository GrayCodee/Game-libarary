import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameFormComponent from "../components/GameFormComponent";
import { toast } from "sonner";

const GameFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-game-dark p-6">
      <div className="max-w-4xl mx-auto bg-game-card rounded-lg p-6">
        <GameFormComponent onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default GameFormPage;

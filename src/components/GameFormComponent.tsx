import React, { useState, useEffect } from 'react';
import { Game, GameCategory, Platform } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "playstation", label: "PlayStation" },
  { value: "xbox", label: "Xbox" },
  { value: "pc", label: "PC" },
  { value: "nintendo", label: "Nintendo" },
  { value: "mobile", label: "Mobile" },
];

const CATEGORIES: { value: GameCategory; label: string }[] = [
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

const GameFormComponent = ({ game, onSubmit, onCancel }: { game?: Game, onSubmit: (game: Game) => void, onCancel: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [category, setCategory] = useState<GameCategory>("action");
  const [releaseDate, setReleaseDate] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");

  useEffect(() => {
    if (game) {
      setTitle(game.title);
      setDescription(game.description);
      setLongDescription(game.longDescription || "");
      setCoverImage(game.coverImage);
      setVideoUrl(game.videoUrl || "");
      setSelectedPlatforms(game.platforms);
      setCategory(game.category);
      setReleaseDate(game.releaseDate || "");
      setDeveloper(game.developer || "");
      setPublisher(game.publisher || "");
    }
  }, [game]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !coverImage || !category || selectedPlatforms.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedGame: Game = {
      id: game ? game.id : uuidv4(),
      title,
      description,
      longDescription: longDescription || undefined,
      coverImage,
      videoUrl: videoUrl || undefined,
      platforms: selectedPlatforms,
      category,
      releaseDate: releaseDate || undefined,
      developer: developer || undefined,
      publisher: publisher || undefined,
    };

    onSubmit(updatedGame);
  };

  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        if (type === 'image') {
          setCoverImage(reader.result);
        } else {
          setVideoUrl(reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Game Title*</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Short Description*</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="coverImage">Cover Image*</Label>
          <Input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image')}
            className="mt-1"
          />
          {coverImage && (
            <img src={coverImage} alt="Preview" className="mt-2 max-w-xs rounded" />
          )}
        </div>

        <div>
          <Label htmlFor="videoFile">Game Video</Label>
          <Input
            id="videoFile"
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'video')}
            className="mt-1"
          />
          {videoUrl && (
            <video src={videoUrl} className="mt-2 max-w-xs rounded" controls />
          )}
        </div>

        <div>
          <Label>Platforms*</Label>
          <div className="mt-2 flex flex-wrap gap-4">
            {PLATFORMS.map((platform) => (
              <div key={platform.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform.value}`}
                  checked={selectedPlatforms.includes(platform.value)}
                  onCheckedChange={() => togglePlatform(platform.value)}
                />
                <Label
                  htmlFor={`platform-${platform.value}`}
                  className="cursor-pointer"
                >
                  {platform.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category*</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as GameCategory)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="developer">Developer</Label>
          <Input
            id="developer"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-game-purple hover:bg-game-purple-dark">
          {game ? "Update Game" : "Add Game"}
        </Button>
      </div>
    </form>
  );
};

export default GameFormComponent;

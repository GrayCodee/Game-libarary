import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

// Define types needed for the component
type Platform = "playstation" | "xbox" | "pc" | "mobile";
type GameCategory = "action" | "adventure" | "rpg" | "puzzle";

// Platform mapping to their numeric IDs
const PLATFORM_IDS: Record<Platform, number> = {
  pc: 1,
  playstation: 2,
  xbox: 3,
  mobile: 4,
};

// Category mapping to their numeric IDs
const CATEGORY_IDS: Record<GameCategory, number> = {
  action: 1,
  adventure: 2,
  puzzle: 3,
  rpg: 4,
};

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "playstation", label: "PlayStation" },
  { value: "xbox", label: "Xbox" },
  { value: "pc", label: "PC" },
  { value: "mobile", label: "Mobile" },
];

const CATEGORIES: { value: GameCategory; label: string }[] = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "rpg", label: "RPG" },
  { value: "puzzle", label: "Puzzle" },
];

// Cloudinary configuration constants
const CLOUDINARY_CLOUD_NAME = "dsctpgxda"; // Replace this with your cloud name
const CLOUDINARY_UPLOAD_PRESET = "abdola2"; // Replace with your unsigned upload preset

const GameFormComponent = ({ onCancel }: { onCancel: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [localImagePreview, setLocalImagePreview] = useState("");
  const [localVideoPreview, setLocalVideoPreview] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [category, setCategory] = useState<GameCategory>("action");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ image: 0, video: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !title ||
      !description ||
      !coverImage ||
      !category ||
      selectedPlatforms.length === 0
    ) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Map platform strings to their respective numeric IDs
    const platformIds = selectedPlatforms.map(
      (platform) => PLATFORM_IDS[platform]
    );

    const newGame = {
      name: title,
      description,
      imageUrl: coverImage,
      videoUrl: videoUrl || "",
      categoryid: CATEGORY_IDS[category], // Using numeric categoryid
      gameDeviceIds: platformIds, // Using numeric IDs for platforms
    };

    try {
      const response = await axios.post(
        "https://localhost:44385/api/games/CreateGame",
        newGame
      );
      toast.success("Game added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to add the game. Please try again.");
      console.error("API Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCoverImage("");
    setVideoUrl("");
    setLocalImagePreview("");
    setLocalVideoPreview("");
    setSelectedPlatforms([]);
    setCategory("action");
    setUploadProgress({ image: 0, video: 0 });
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // Create local preview immediately
  const createLocalPreview = (file: File, type: "image" | "video") => {
    const localUrl = URL.createObjectURL(file);
    if (type === "image") {
      setLocalImagePreview(localUrl);
    } else {
      setLocalVideoPreview(localUrl);
    }
    return localUrl;
  };

  // Upload file to Cloudinary
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create and show local preview immediately
    createLocalPreview(file, type);

    // Start upload process
    setIsUploading(true);
    setUploadProgress((prev) => ({ ...prev, [type]: 0 }));
    toast.info(`Uploading ${type}...`);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Set resource_type based on file type
    const resourceType = type === "image" ? "image" : "video";

    try {
      // Use XHR to track upload progress
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`
      );

      // Track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress((prev) => ({ ...prev, [type]: percentComplete }));
        }
      };

      // Handle completion
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          if (type === "image") {
            setCoverImage(data.secure_url);
          } else {
            setVideoUrl(data.secure_url);
          }
          toast.success(`${type} uploaded successfully!`);
        } else {
          throw new Error(`Upload failed with status: ${xhr.status}`);
        }
        setIsUploading(false);
        setUploadProgress((prev) => ({ ...prev, [type]: 100 }));
      };

      // Handle errors
      xhr.onerror = () => {
        toast.error(`Failed to upload ${type}.`);
        console.error("XHR Upload error");
        setIsUploading(false);
      };

      xhr.send(formData);
    } catch (error) {
      toast.error(`Failed to upload ${type}.`);
      console.error("Upload error:", error);
      setIsUploading(false);
    }
  };

  // Cleanup function for local previews
  React.useEffect(() => {
    return () => {
      if (localImagePreview) URL.revokeObjectURL(localImagePreview);
      if (localVideoPreview) URL.revokeObjectURL(localVideoPreview);
    };
  }, [localImagePreview, localVideoPreview]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Title Input */}
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

          {/* Description Input */}
          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* File Inputs */}
          <div>
            <Label htmlFor="coverImage">Cover Image*</Label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="mt-1"
              disabled={isUploading}
              aria-describedby="coverImageHelp"
            />
            <p id="coverImageHelp" className="text-sm text-gray-500 mt-1">
              Supported formats: JPG, PNG, WebP
            </p>
            {uploadProgress.image > 0 && uploadProgress.image < 100 && (
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress.image}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {uploadProgress.image}% uploaded
                </p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="videoFile">Game Video</Label>
            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="mt-1"
              disabled={isUploading}
              aria-describedby="videoFileHelp"
            />
            <p id="videoFileHelp" className="text-sm text-gray-500 mt-1">
              Supported formats: MP4, WebM (Max 100MB)
            </p>
            {uploadProgress.video > 0 && uploadProgress.video < 100 && (
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress.video}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {uploadProgress.video}% uploaded
                </p>
              </div>
            )}
          </div>

          {/* Platforms Selection */}
          <div>
            <Label>Platforms*</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform.value}
                  className="flex items-center space-x-2"
                >
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

          {/* Category Selection */}
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
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-game-purple hover:bg-game-purple-dark"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? "Adding..." : "Add Game"}
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="space-y-6 sticky top-6">
        <div className="rounded-lg overflow-hidden bg-game-card p-6 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Preview</h2>

          {/* Image Preview - Show local preview first, fallback to uploaded image */}
          {localImagePreview || coverImage ? (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Cover Image{" "}
                {uploadProgress.image > 0 &&
                  uploadProgress.image < 100 &&
                  `(Uploading: ${uploadProgress.image}%)`}
              </h3>
              <img
                src={localImagePreview || coverImage}
                alt="Game cover preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                Upload a cover image to see preview
              </p>
            </div>
          )}

          {/* Video Preview - Show local preview first, fallback to uploaded video */}
          {(localVideoPreview || videoUrl) && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Video Preview{" "}
                {uploadProgress.video > 0 &&
                  uploadProgress.video < 100 &&
                  `(Uploading: ${uploadProgress.video}%)`}
              </h3>
              <video
                src={localVideoPreview || videoUrl}
                controls
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameFormComponent;

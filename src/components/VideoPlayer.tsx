
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-black">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={videoUrl}
          title="Game trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </AspectRatio>
    </div>
  );
};

export default VideoPlayer;

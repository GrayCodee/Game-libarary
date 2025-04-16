import React from "react";
import { Platform } from "../types";
import { Gamepad2, Laptop, Smartphone } from "lucide-react";

interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  className = "",
}) => {
  const getIcon = () => {
    switch (platform) {
      case "PlayStation":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${className}`}
            aria-label="PlayStation"
          >
            <path
              d="M9.5 11.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75.34-.75.75-.75.75.34.75.75zM20 8v14H4V8M12 6H8a2 2 0 0 0-2 2v2m12-4h-4m0 0v2m0-2L8 8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "Xbox":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${className}`}
            aria-label="Xbox"
          >
            <path d="M12 21c-5.5 0-10-4.5-10-10S6.5 1 12 1s10 4.5 10 10-4.5 10-10 10zm0-18c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" />
            <path d="M16.9 7.1c-1.1-1.1-2.5-1.7-4.1-1.7-3.2 0-5.9 2.6-5.9 5.9 0 1.5.6 3 1.7 4.1l1.4-1.4c-.7-.7-1.1-1.6-1.1-2.7 0-2.1 1.7-3.9 3.9-3.9.9 0 1.8.3 2.5.9l1.6-1.2z" />
            <path d="M7.1 16.9c1.1 1.1 2.5 1.7 4.1 1.7 3.2 0 5.9-2.6 5.9-5.9 0-1.5-.6-3-1.7-4.1l-1.4 1.4c.7.7 1.1 1.6 1.1 2.7 0 2.1-1.7 3.9-3.9 3.9-.9 0-1.8-.3-2.5-.9l-1.6 1.2z" />
          </svg>
        );
      case "PC":
        return <Laptop className={`w-5 h-5 ${className}`} aria-label="PC" />;
      case "Mobile":
        return (
          <Smartphone className={`w-5 h-5 ${className}`} aria-label="Mobile" />
        );
      default:
        return (
          <Gamepad2
            className={`w-5 h-5 ${className}`}
            aria-label="Gaming device"
          />
        );
    }
  };

  return getIcon();
};

export default PlatformIcon;

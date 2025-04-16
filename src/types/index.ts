export type Platform = "PlayStation" | "Xbox" | "PC" | "Mobile";

export type GameCategory =
  | "action"
  | "adventure"
  | "rpg"
  | "strategy"
  | "simulation"
  | "sports"
  | "puzzle"
  | "racing"
  | "fighting"
  | "shooter"
  | "horror";

export interface Game {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  coverImage: string;
  videoUrl?: string;
  platforms: Platform[];
  category: GameCategory;
  releaseDate?: string;
  developer?: string;
  publisher?: string;
}

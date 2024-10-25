export interface PlayerCount {
  min: number;
  max?: number;
}

export interface Game {
  id: string;
  name: string;
  releaseYear?: number;
  players: PlayerCount;
  publisher: string;
  expansions?: string[];
  baseGame?: string;
  standalone?: boolean;
  type: 'BaseGame' | 'Expansion';
}
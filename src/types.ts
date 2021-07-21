export interface CheckPoint {
  id: number;
  latitude: number;
  longitude: number;
  task: Task;
}

export interface Game {
  id: number;
  name: string;
  maxParticipantCount: number;
  totalTask: number;
  durationMinute: number;
  imposterCount: number;
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  checkPoints: Array<CheckPoint>;
}

export interface Room {
  id: number;
  code: string;
  game: Game;
  completeCount: number;
  participants: Array<Player>;
  survivers: Array<{ id: number }>;
  imposters: Array<{ id: number }>;
  startImposters: Array<{ id: number }>;
  isAlive: boolean;
  isCrewMateWin: boolean;
  isEnded: boolean;
  isImposter: boolean;
  isImposterWin: boolean;
  isReadyToStart: boolean;
  isStarted: boolean;
  minutePast: number;
}

export interface Player {
  id: number;
  name: string;
  color: string;
  hat: string;
}

export enum Task {
  WIRE = "WIRE",
  UPLOAD = "UPLOAD",
  DOWNLOAD = "DOWNLOAD",
  EXPERIMENT = "EXPERIMENT",
}

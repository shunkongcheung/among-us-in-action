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
  participants: Array<Player>;
  survivers: Array<Player>;
  imposters: Array<Player>;
  startAt?: Date;
  endAt?: Date;
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

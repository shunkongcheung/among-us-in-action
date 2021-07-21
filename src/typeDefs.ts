import { gql } from "@apollo/client";
const typeDefs = gql`
  type Game {
    id: Float!
    name: String!
    maxParticipantCount: Float!
    imposterCount: Float!
    totalTask: Float!
    durationMinute: Float!
    checkPoints: [CheckPoint!]!
    latitude: Float!
    longitude: Float!
    latitudeDelta: Float!
    longitudeDelta: Float!
  }

  type CheckPoint {
    id: Float!
    game: Game!
    task: Task!
    latitude: Float!
    longitude: Float!
  }

  enum Task {
    WIRE
    UPLOAD
    DOWNLOAD
    EXPERIMENT
  }

  input CheckPointInputType {
    task: Task!
    latitude: Float!
    longitude: Float!
  }

  type Player {
    id: Float!
    name: String!
    hat: String!
    color: String!
    latitude: Float!
    longitude: Float!
  }

  type Corpse {
    id: Float!
    player: Player!
    latitude: Float!
    longitude: Float!
  }

  input PlayerInputType {
    name: String!
    hat: String!
    color: String!
  }

  type Room {
    id: Float!
    game: Game!
    code: String!
    participants: [Player!]!
    imposters: [Player!]!
    survivers: [Player!]!
    corpses: [Corpse!]!
    completeCount: Int!
    startAt: DateTime
    endAt: DateTime
  }

  scalar DateTime

  type VoteEvent {
    id: Float!
    room: Room!
    game: Game!
    isCompleted: Boolean!
    voteOutPlayer: Player
    votes: [VoteEntry!]!
  }

  type VoteEntry {
    id: Float!
    voteEvent: VoteEvent!
    voteFor: Player
    voteBy: Player!
  }
`;

export default typeDefs;

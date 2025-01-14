import type { Timestamp } from "firebase-admin/firestore";

export type Player = {
  /**
   * true if the player has not bean voted out yet
   */
  alive: boolean;

  /**
   * the cat profile picture that the user has selected
   */
  avatar: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * the name of the user that should be displayed
   */
  displayName: string;

  /**
   * the number of players that have voted for this player
   */
  votes?: number;
};

export type GameState = "WAIT" | "PROMPT" | "CHAT" | "VOTE" | "END";

/**
 * the type of documents `/lobbies/{code}`
 */
export type Lobby = {
  /**
   * the UIDs of the players in this lobby
   */
  uids: string[];

  /**
   * data about each player in the lobby
   *
   * @note uids[x] and players[x] belong to the same player
   */
  players: Player[];

  /**
   * the current state of the game
   */
  state: GameState;
};

/**
 * the role of a player
 */
export type Role = "CAT" | "CATFISH";

/**
 * the type of documents `/lobbies/{code}/privatePlayers/{uid}`
 */
export type PrivatePlayer = {
  /**
   * the role of the player
   */
  role: Role;

  /**
   * the prompt that the user will be shown (this varies on the role)
   */
  prompt: string;
};

/**
 * the type of documents `/lobbies/{code}/votes/{uid}`
 */
export type Vote = {
  /**
   * the UID of the player that the player owning this document has voted for
   */
  target: string;
};

/**
 * the type of documents `/lobbies/{code}/chatRooms/{chatRoomId}`
 */
export type ChatRoom = {
  /**
   * the UIDs of the pair of players chatting in this chat room
   */
  pair: [string, string];

  /**
   * the UIDs of the users that can read this chat room (stalker and spectators)
   */
  viewers: string[];
};

/**
 * the type of documents `/lobbies/{code}/chatRooms/{chatRoomId}/chatMessages/{messageId}`
 */
export type ChatMessage = {
  /**
   * the UID of the player that sent this message
   */
  sender: string;

  /**
   * the text content of the message
   */
  text: string;

  /**
   * the time when the message was sent (used for sorting)
   */
  timestamp: Timestamp;
};

/**
 * the type of documents `/lobbies/{code}/chatMessages/{messageId}`
 */
export type LobbyChatMessage = ChatMessage & {
  /**
   * true if the player has not bean voted out yet
   */
  alive: boolean;
};

export function chatMessageValidator(displayName: string): { valid: true } | { valid: false; reason: string } {
  if (displayName.length == 0) {
    return { valid: false, reason: "Chat message may not be empty" };
  }

  if (displayName.length > 100) {
    return { valid: false, reason: "Chat message must be at most 100 characters long" };
  }

  if (displayName !== displayName.trim()) {
    return { valid: false, reason: "Chat message must not contain leading or trailing whitespace" };
  }

  return { valid: true };
}

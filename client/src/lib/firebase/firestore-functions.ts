import { functions } from "$lib/firebase/app";
import { httpsCallable } from "firebase/functions";
import type { LobbyRequest, ErrorResponse, ChatRequest } from "./firestore-functions-types";

export const startGame = httpsCallable<LobbyRequest, ErrorResponse>(functions, "startGame");
export const joinLobby = httpsCallable<LobbyRequest, ErrorResponse>(functions, "joinLobby");
export const deleteChatRooms = httpsCallable<LobbyRequest, ErrorResponse>(functions, "deleteChatRooms");
export const addChatMessage = httpsCallable<ChatRequest, ErrorResponse>(functions, "addChatMessage");

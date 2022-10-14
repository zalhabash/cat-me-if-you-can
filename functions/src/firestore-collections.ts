import type { Lobby, PrivatePlayer, PromptAnswer } from "./firestore-types/lobby";
import type { CollectionReference, DocumentReference } from "firebase-admin/firestore";
import { db } from "./app";

export const lobbyCollection = db.collection("lobbies") as CollectionReference<Lobby>;

export function getPrivatePlayerCollection(lobbyDoc: DocumentReference<Lobby>): CollectionReference<PrivatePlayer> {
  return lobbyDoc.collection("privatePlayers") as CollectionReference<PrivatePlayer>;
}

export function getPromptAnswerCollection(lobbyDoc: DocumentReference<Lobby>): CollectionReference<PromptAnswer> {
  return lobbyDoc.collection("promptAnswers") as CollectionReference<PromptAnswer>;
}
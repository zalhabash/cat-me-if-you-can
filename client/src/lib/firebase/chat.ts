import { query, where, getDocs } from "firebase/firestore";
import { getChatRoomCollection } from "./firestore-collections";

/**
 * Checks if the user is in a chatroom then returns their chatroom doc
 */
export async function findChatRoom(lobbyId: string, playerId: string) {
  const queryChatRoom = await getDocs(query(getChatRoomCollection(lobbyId), where("pair", "array-contains", playerId)));
  return queryChatRoom.docs[0];
}

export async function findViewerChatRoom(lobbyId: string, viewerId: string) {
  const queryChatRoom = await getDocs(
    query(getChatRoomCollection(lobbyId), where("viewers", "array-contains", viewerId))
  );
  return queryChatRoom.docs[0];
}

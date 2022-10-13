import { addDoc, query, where, getDocs } from "firebase/firestore";
import { getChatRoomCollection } from "./firestore-collections";

export function generatePairChatrooms(lobbyId: string, uids: string[]) {
  const pairs: { one: string; two: string; stalker?: string }[] = [];
  let pairOne, pairTwo, stalker: string;
  // Check if the lobby is uneven to find stalker
  if (uids.length % 2 !== 0) {
    while (uids.length !== 1) {
      // get random pair
      pairOne = uids[Math.floor(Math.random() * uids.length)];
      pairTwo = uids[Math.floor(Math.random() * uids.length)];
      // generate a random player if the current pairs are equal
      while (pairOne === pairTwo) {
        pairTwo = uids[Math.floor(Math.random() * uids.length)];
      }
      // organize the pairs
      pairs.push({ one: pairOne, two: pairTwo });
      // delete them from temp array
      uids.splice(uids.indexOf(pairOne), 1);
      uids.splice(uids.indexOf(pairTwo), 1);
    }
    //TODO: Make this guy a stalker somehow
    stalker = uids[0];
  }
  // even number of players
  else {
    while (uids.length !== 0) {
      // get random pair
      pairOne = uids[Math.floor(Math.random() * uids.length)];
      pairTwo = uids[Math.floor(Math.random() * uids.length)];
      // generate a random player if the current pairs are equal
      while (pairOne === pairTwo) {
        pairTwo = uids[Math.floor(Math.random() * uids.length)];
      }
      // organize the pairs
      pairs.push({ one: pairOne, two: pairTwo });
      // delete them from temp array
      uids.splice(uids.indexOf(pairOne), 1);
      uids.splice(uids.indexOf(pairTwo), 1);
    }
  }
  pairs.forEach(async ({ one, two }) => {
    await createChatRoom(lobbyId, [one, two]);
  });
}
export async function findChatRoom(lobbyId: string, playerId: string) {
  const queryChatRoom = await getDocs(query(getChatRoomCollection(lobbyId), where("pair", "array-contains", playerId)));
  return queryChatRoom.docs[0];
}

export const createChatRoom = async (lobbyId: string, pair: [string, string]) => {
  const chatroom = await addDoc(getChatRoomCollection(lobbyId), {
    pair,
    viewers: [],
  });

  return chatroom;
};

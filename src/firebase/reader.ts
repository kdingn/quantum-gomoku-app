import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getDataFromFirestore(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  const data = snapshot.docs.map((doc) => doc.data());
  return data;
}

import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function exportReviewsToFirestore(
  id,
  rating,
  message,
  created_at,
  replies,
  upvotes,
  downvotes
) {
  try {
    // const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("reviews").add({
      id: id,
      rating: rating,
      message: message,
      created_at: created_at,
      upvotes,
      downvotes
    });
    db.collection("reviews").collection("replies").add({
      replies: replies
    });
  } catch (err) {
    Alert.alert("Something went wrong.", err.message);
  }
}

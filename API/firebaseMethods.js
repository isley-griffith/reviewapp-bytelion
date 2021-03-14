import * as firebase from "firebase";

function settingDataTest() {
  firebase
    .database()
    .ref("reviews/" + "0")
    .set({
      id: 1,
      rating: 3.5,
      message: "This is alright!",
      created_at: "2020-01-12T01:35:59.820Z",
    });
}
// settingDataTest();

function retrieveDataTest() {
  firebase
    .database()
    .ref("reviews/")
    .once("value")
    .then((snapshot) => {
      let userData = [];
      snapshot.forEach((child) => {
        userData.push(snapshot.val());
      });
    });
}



// let query = firebase.database().ref("reviews").orderByKey();
// let result = [];
// query.once("value").then((snapshot) => {
//   snapshot.forEach((childSnapshot) => {
//     let key = childSnapshot.key;
//     let childData = childSnapshot.val();
//   })
// })

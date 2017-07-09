/*var config = {
  apiKey: "AIzaSyAO7cm-0rjVrku070AeFsdbdR6R5hOM9Sg",
  authDomain: "marcus-4233c.firebaseapp.com",
  databaseURL: "https://marcus-4233c.firebaseio.com",
  projectId: "marcus-4233c",
  storageBucket: "marcus-4233c.appspot.com",
  messagingSenderId: "640350664488"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());

  firebase.auth().signInWithPopup(provider).then(function(res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  })

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
*/

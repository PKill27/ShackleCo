/**firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});**/
//signupBtn = document.getElementById("signup");
//document.getElementById("Form").addEventListener("submit", addUser);
document.getElementById("cont").addEventListener("click", function () {
    console.log("got here");
    var email = document.getElementById("emailAuth").value;
    var password = document.getElementById("passwordAuth").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
});
addUser();

function addUser() {
    console.log("got here");
    var email = document.getElementById("emailAuth").value;
    var password = document.getElementById("passwordAuth").value;
    firebase.auth().createUserWithEmailAndPassword("hardcode@gmail.com", "testo").catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    document.getElementById('Form').reset();
}
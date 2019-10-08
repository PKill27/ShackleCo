 var firebaseConfig = {
     apiKey: "AIzaSyAzvlKym2EdAvdk3JbZY5O8o9n0wHWN2CQ"
     , authDomain: "contact-input.firebaseapp.com"
     , databaseURL: "https://contact-input.firebaseio.com"
     , projectId: "contact-input"
     , storageBucket: ""
     , messagingSenderId: "1002759570622"
     , appId: "1:1002759570622:web:f68bec4d3361c2b2"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 // Reference messages collection
 var messagesRef = firebase.database().ref('messages');
 //listen to submit form calls submit form
 document.getElementById("contactForm").addEventListener("submit", submitForm);

 function submitForm(e) {
     e.preventDefault();
     var first = getInputVal('first');
     var last = getInputVal('last');
     var email = getInputVal('email');
     var phone = getInputVal('phone');
     var message = getInputVal('message');
     saveMessage(first, last, email, phone, message);
     document.getElementById('contactForm').reset();
 }

 function getInputVal(id) {
     return document.getElementById(id).value;
 }
 // Save message to firebase
 function saveMessage(first, last, email, phone, message) {
     var newMessageRef = messagesRef.push();
     newMessageRef.set({
         first: first
         , last: last
         , email: email
         , phone: phone
         , message: message
     });
 }
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

//const nodemailer = require('nodemailer');

const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    host: "smtp.office365.com",  
    secureConnection: true,
    port: 587,
    auth: {
        user: "",
        pass: ""
    }
       
     
});

exports.makeUppercase = functions.database.ref('/messages/{uniqueId}')
    .onCreate((user, context) => {
        console.log(user.val());
        const email = user.val().email; // The email of the user.
 		 const name= user.val().first;
 		 const message= user.val().message;
     return sendWelcomeEmail(email,name,message);
    });

async function sendWelcomeEmail(email,name,message) {
    console.log(email);
  const mailOptions = {
    from: 'rigging@shackleco.com',
    to: 'rigging@shackleco.com',
    subject: 'Message Form Filed Out',
    html: "<body>" +
        "<p>from "+name+"</p>" +
        "<p>At email "+email+"</p>" +
        "<p>with message: "+message+"</p>" +
        "</body>"
  };
   // The user subscribed to the newsletter.
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);

  return null;
}

exports.recipt = functions.database.ref('/order/{uniqueId}/itms')
    .onCreate((order, context) => {
    	
        var itms = order.val().items;
        var adress = order.val().userInfo;
     return sendReciptEmail(itms,adress);
    });

async function sendReciptEmail(itms,adress) {
	
  const mailOptions = {
    from: 'rigging@shackleco.com',
    to: [adress[1].email,'rigging@shackleco.com'],
    subject: 'Successful order from shackelCO',
    html: makeHTML(itms)
  };
   // The user subscribed to the newsletter.
  await mailTransport.sendMail(mailOptions);
  console.log('recipt sent to', adress[1].email);

  return null;
}
 function makeHTML(array) {
        // Create the list element:
        console.log("arrar",array);
        var HTMLstring ="<h2 style = 'content-align:center;'>Thank you for purchasing from ShackleCo</h2>";
        HTMLstring =HTMLstring+"<table><thead><tr><th>product</th><th>Quantity</th><th>Color</th><th>Total Price</th></tr></thead><tbody>"
        var quantity = 0;
        var price = 0;
        for (var i = 0; i < array.length; i++) {
            HTMLstring = HTMLstring + "<tr><td>"+array[i].itmName+"</td><td>"+array[i].quantity+"</td><td>"+array[i].color+"</td><td>"+array[i].price * array[i].quantity+"</td></tr>";
            price = price +array[i].price * array[i].quantity;
            quantity = array[i].quantity;
        }
       HTMLstring = HTMLstring + "<tr><td>All Items</td><td>"+quantity+"</td><td> </td><td>"+price+"</td></tr>";
        HTMLstring = HTMLstring +"</tbody></table>"
        HTMLstring = HTMLstring +"<h5>You will be reciving an email regarding shipping soon, thank you!</h5>"
        return HTMLstring;
    }


import '/imports/startup/server';
// import { Meteor } from 'meteor/meteor';
// import { Geolocation } from 'meteor/mdg:geolocation';
// import { GeoCoder } from 'meteor/aldeed:geocoder';
import { Profiles } from '../imports/api/profiles/profiles.js';
import { Notifications } from '../imports/api/notifications/notifications.js';
import { Dressings } from '../imports/api/dressings/dressings.js';
// import { Images } from '../imports/api/images/images.js';

// Meteor.methods({
// 	'getLocation': function(latitude, longitude){
// 		var geo = new GeoCoder();
// 		var result = geo.reverse(latitude, longitude);
// 		return result;
// 	}
// });

Meteor.startup(function () {
    process.env.MAIL_URL = Meteor.settings.MAIL_URL;
});

Meteor.users.allow({
    update: function() {
    	return false;
    },
    insert: function() {
    	return false;
    }
});

Accounts.onCreateUser(function(options, user) {
  
  var mail = "";

  if(user.services.facebook){

    if(user.services.facebook.email){
      mail = user.services.facebook.email;
    }

  } else if (user.services.twitter){

    if(user.services.twitter.email){
      mail = user.services.twitter.email;
    }

  } else if (user.services.google){

    if(user.services.google.email){
      mail = user.services.google.email;
    }

  } else {
    mail = user.emails[0].address;
  }

  if(!user.username){
      user.username = "Anonyme";
  }
	Profiles.insert({
		userId: user._id,
    userName: user.username,
    email: mail,
	});
  Dressings.insert({
    ownerId: user._id,
    name: "Dressing de " + user.username
  });
	return user;
});

Meteor.methods({
  sendEmail: function (to, subject, text) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: to,
      subject: subject,
      html: text
    });
  }
});
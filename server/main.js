import { userProfile } from '../imports/api/userProfile.js';
import { Images } from '../imports/api/cloth.js';

Meteor.startup(function () {
    /*
    * swapmysuitnoreply@gmail.com
    * Swap2016suit
    */
    process.env.MAIL_URL = 'smtp://swapmysuitnoreply%40gmail.com:Swap2016suit@smtp.gmail.com:587';
    SimpleSchema.debug = true;
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
  if(!user.username){
    user.username = "Anonyme"
  }
	userProfile.insert({
		userId: user._id,
    dressingName: "Dressing de " + user.username
	}, function(error, result) {
	  if(error){
	  	console.log(error.invalidKeys);
	  }
	});
	return user;
});

import '../imports/api/tasks.js';
//import '../imports/api/lists/user.js';
import { userProfile } from '../imports/api/userProfile.js';
import { Dressing } from '../imports/api/dressing.js';
/*
* swapmysuitnoreply@gmail.com
* Swap2016suit
*/
Meteor.startup(function () {
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
	Dressing.insert({
		userId: user._id
	}, function(error, result) {
	  if(error){
	  	console.log(error.invalidKeys);
	  }
	  else {
		console.log("Dressing Created");
	  }
	});
	userProfile.insert({
		userId: user._id
	}, function(error, result) {
	  if(error){
	  	console.log(error.invalidKeys);
	  }
	  else {
		console.log("userProfile Created");
	  }
	});
	return user;
});

// Reverse
// var geo = new GeoCoder({
//   geocoderProvider: "mapquest",
//   httpAdapter: "https",
//   apiKey: 'YOUR_API_KEY'
// });
// var result = geo.reverse(45.767, 4.833);
// console.log(result);
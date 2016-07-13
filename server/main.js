import '/imports/startup/server';
import { GeoCoder } from 'meteor/aldeed:geocoder';
import { UserInfos } from '../imports/api/userInfos/userInfos.js';

Meteor.methods({
	'getLocation': function(latitude, longitude){
		var geo = new GeoCoder();
		var result = geo.reverse(latitude, longitude);
		return result;
	}
});

Meteor.startup(function () {
    /*
    * email : swapmysuitnoreply@gmail.com
    * imgur login: SwapMyStyle
    * password : Swap2016suit
    * imgur ClientID: 978c711049778ca
    * imgur ClientSecret: 21019f3ffaf98daf72592f78feb85e3139cbda05
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
    console.log("creation : ", user);
    if(!user.username){
        user.username = "Anonyme";
    }
	UserInfos.insert({
		userId: user._id,
    	dressingName: "Dressing de " + user.username
	}, function(error, result) {
	  if(error){
	  	console.log(error.invalidKeys);
	  }
      else {
        console.log("result : ", result);
      }
	});
	return user;
});
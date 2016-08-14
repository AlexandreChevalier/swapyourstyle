import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
// import { Geolocation } from 'meteor/mdg:geolocation';

// Associated template
import './home-page.html';
// Needed components
import '../homepage/presentation.js';
import '../homepage/info-banner.js';
import '../homepage/theme-item.js';
import './userData.js';

Template.Home_page.onCreated(function(){
	// this.state = new ReactiveDict();
	// Meteor.subscribe('userInfos');
	// Meteor.subscribe('clothes');
	// Meteor.subscribe('images');
});

Template.Home_page.onRendered(function(){
	$( document ).ready(function(){
		// Loading parallax for image blocks
		$(".parallax").parallax();
		$('body')
			.velocity("fadeIn", { duration: 500 })
    		.velocity({ opacity: 1 });
	});
});

Template.Home_page.helpers({
	// getAddress: function(){
	// 	var location = Geolocation.currentLocation().coords;
	// 	Meteor.call('getLocation', location.latitude, location.longitude, function(err, response) {
	// 		Session.set('location', response[0]);
	// 	});
	// 	return Session.get('location').formattedAddress;
	// }
});
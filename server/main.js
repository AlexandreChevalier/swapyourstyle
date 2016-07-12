import '/imports/startup/server';
import { GeoCoder } from 'meteor/aldeed:geocoder';

Meteor.methods({
	'getLocation': function(latitude, longitude){
		var geo = new GeoCoder();
		var result = geo.reverse(latitude, longitude);
		return result;
	}
});
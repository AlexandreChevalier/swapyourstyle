import './location.html';

Template.location.helpers({
	position : function() {
		var pos = Geolocation.latLng();
		return {
			lat : pos.lat,
			lng : pos.lng,
		}; 
	},
	town : function(lat, lng) {
		//TODO GoogleMaps import + computations
	}
});
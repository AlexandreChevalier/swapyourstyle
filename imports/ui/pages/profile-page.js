import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import './profile-page.html';

Template.Profile_page.onRendered(function() {
  //needed so the select displays 
  $( document ).ready(function(){
    $('select').material_select();
  });
});

Template.Profile_page.onCreated(function() {
  //needed so the select displays 
  var infos = Profiles.findOne({userId: Meteor.userId()});
  /*if(!infos.address){
    if(Geolocation.currentLocation()){
      var location = Geolocation.currentLocation().coords;
      Meteor.call('getLocation', location.latitude, location.longitude, function(err, response) {
        Session.set('location', response[0]);
      });
      swal({
        title: "Is this your Address ?",
        text: Session.get('location').formattedAddress,
        type: "warning",
        confirmButtonColor: "#FF0000",
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "No",
        closeOnConfirm: false,
        html: false
      }, function(){
        Profiles.update(infos._id,
          {$set: {address: {
            street: Session.get('location').streetNumber + " " + Session.get('location').streetName,
            postalCode: Session.get('location').zipcode,
            city: Session.get('location').city,
            country: Session.get('location').country
          }}},
          function(error, result) {
            if(error){
              swal("Error !",
                "Error : " + error.invalidKeys,
                "error");
            }
            else {
              swal("Updated !",
                "Your address has been updated",
                "success");
            }
          });
      });

    }
  }*/
});

Template.Profile_page.helpers({
  profiles() { return Profiles },
  profile() {
    var item = Profiles.findOne({userId: Meteor.userId()});
    return item;
  },
});

var Profile_page_hooks = {
  onSuccess: function (doc) {
    FlowRouter.go('/');
  }
}
AutoForm.addHooks('updateProfileForm', Profile_page_hooks);

Template.Profile_page.events({
	'click .logout'() {
    	Meteor.logout();
    	// FIXME : not secure
    	FlowRouter.go('home');
    },
});
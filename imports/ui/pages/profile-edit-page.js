/**
 * Created by Marc on 27/04/2016.
 */

import { Profiles } from '../../api/profiles/profiles.js';
import './profile-edit-page.html';

import { Template } from 'meteor/templating';

Template.Profile_edit_page.onRendered(function() {
  //needed so the select displays 
  $( document ).ready(function(){
    $('select').material_select();
  });
});

Template.Profile_edit_page.onCreated(function() {
  //needed so the select displays 
  var infos = Profiles.findOne({userId: Meteor.userId()});
  if(!infos.address){
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
  }
});

Template.Profile_edit_page.helpers({
  selfProf: function(){
    var item = Profiles.findOne({userId: Meteor.userId()});
    return item;
  },
  profiles: function(){
    return Profiles;
  },
  getUpdateLegend: function(){
    return T9n.get("Updating your profile");
  },
  getSubmit: function(){
    return T9n.get("Submit");
  },
  getReset: function(){
    return T9n.get("Reset");
  }
});

var Profile_edit_pageHooks = {
  onSuccess: function (doc) {
    FlowRouter.go('/');
  }
}
AutoForm.addHooks('updateProfileForm', Profile_edit_pageHooks);
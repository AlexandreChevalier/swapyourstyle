import { Template } from 'meteor/templating';
import { Profiles } from '../../api/profiles/profiles.js';
import { Images } from '../../api/images/images.js';
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
  Session.set("waitingForApiResponse", false);
  Session.set("imageCode", "");
  Session.set("image", []);
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
  before: {
    update: function(doc){
      if(Session.get("image") != ""){
        doc.$set.avatarId = Session.get("image");
      }
      return doc;
    }
  },
  onSuccess: function (doc) {
    FlowRouter.go('/');
  }
}
AutoForm.addHooks('updateProfileForm', Profile_page_hooks);

Template.Profile_page.events({
	'click .logout': function() {
  	Meteor.logout();
  	// FIXME : not secure
  	FlowRouter.go('home');
  },
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      Session.set('waitingForApiResponse', true);
      loadImageFileAsURL(e.currentTarget.files[0], function(response){
        if(response){
          Imgur.upload({
            image: Session.get("imageCode"),
            apiKey: "49240428869e3b2" //TODO : get from environment variable
          }, function (error, data) {
            if(error){
              console.log(error);
            }
            else {
              Images.insert({
                url: data.link,
                deleteHash: data.deletehash
              }, function(error, result) {
                if(error){
                  console.log(error);
                }
                else {
                  console.log(result);
                  Session.set("imageCode", "");
                  Session.set("image", result);
                  Session.set('waitingForApiResponse', false);
                }
              });
            }
          });
        }
        else {
          sweetAlert("error");
        }
      });
    }
  }
});

var loadImageFileAsURL = function(image, callback) {
  var fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent) 
  {
    Session.set('imageCode', fileLoadedEvent.target.result);
    callback(true);
  };

  fileReader.readAsDataURL(image);
}
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

Template.Home_page.onCreated(function(){
  // this.state = new ReactiveDict();
  // Meteor.subscribe('userInfos');
  // Meteor.subscribe('clothes');
  // Meteor.subscribe('images');
});

Template.Home_page.onRendered(function(){
  // Animations
/*  $('#main')
    .velocity("fadeIn", { duration: 200 })
    .velocity({ opacity: 1 });*/
  $( document ).ready(function(){
    // Loading parallax for image blocks
    $(".parallax").parallax();
  });
});

Template.Home_page.helpers({
  // getAddress: function(){
  //  var location = Geolocation.currentLocation().coords;
  //  Meteor.call('getLocation', location.latitude, location.longitude, function(err, response) {
  //    Session.set('location', response[0]);
  //  });
  //  return Session.get('location').formattedAddress;
  // }
});
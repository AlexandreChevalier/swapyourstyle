import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Notifications } from '../../api/notifications/notifications.js';

import './header.html';

Template.Header.onRendered(function(){
  $( document ).ready(function(){
    // Loading side bar
    $(".button-collapse").sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    // Loading dropdown button 
    $(".dropdown-button").dropdown({
      hover:false
    });
  });
});

Template.Header.helpers({
  'title': "Swap Your Style"
});

Template.links.helpers({
  dressing_label: function() {
    if(Meteor.userId()) {
      return "Mon dressing";
    } else { return "Créer mon dressing" }
  },
  profile_label: function() {
    if(Meteor.userId()) {
      if(Meteor.user().username) { 
        return "@"+Meteor.user().username; 
      } 
      else { return "@Utilisateur" }
    }
    else { return "@Déconnecté" }
  },
  getNotifCount: function() {
    let numNotif = Notifications.find({recipient:Meteor.userId(), read:false}).count();
    if(numNotif){
      return numNotif;
    }
    else {
      return 0;
    }
  }
});
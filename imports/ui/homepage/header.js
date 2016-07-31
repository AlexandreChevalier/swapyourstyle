import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

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
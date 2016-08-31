import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Meteor } from 'meteor/meteor';
import { Clothes } from '../../api/clothes/clothes.js';

// Loading templates
import '../../ui/layouts/app-body.js'; // main layout
import '../../ui/pages/home-page.js';
import '../../ui/pages/dressing-page.js';
import '../../ui/pages/search-page.js';
import '../../ui/pages/clothes-add-page.js';
import '../../ui/pages/clothes-edit-page.js';
import '../../ui/pages/clothes-view-page.js';
import '../../ui/pages/profile-page.js';
import '../../ui/pages/profile-edit-page.js';

// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';

// Public routes group
var exposed = FlowRouter.group({});
// Users routes group
var loggedIn = FlowRouter.group({triggersEnter: [checkLogin]});
// Admin routes group
var admin = FlowRouter.group({});

/** 
 * Check-in function allowing to be routed through loggedIn routes
 * only if the user is authenticated
 */
function checkLogin(context) {
  if(!(Meteor.loggingIn() || Meteor.userId())) {
    FlowRouter.go('join');
  }
}

/**
 * BEGIN EXPOSED ROUTES
 */

// Route to homepage
exposed.route('/', {
  name: 'home',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Home_page"});
  }
});


// Route to view clothes form page
exposed.route('/:_id/view', {
  name: 'view-clothes',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Clothes_view_page"});
  }
});

// Default route for clothes searching
exposed.route('/search', {
  name: 'search-clothes',
  action: function(){
    BlazeLayout.render("App_body", {main: "Search_page"});
  }
});

/**
 * END EXPOSED ROUTES
 * BEGIN LOGGED IN ROUTES
 */

// Route to current user's profile
loggedIn.route('/profile', {
  name: 'profile',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Profile_page"});
  }
});

// Route to current user's profile
loggedIn.route('/profile/edit', {
  name: 'edit-profile',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Profile_edit_page"});
  }
});

// Route to current user's dressing
loggedIn.route('/dressing', {
  name: 'dressing',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Dressing_page"});
  }
});

// Route to new clothes form page
loggedIn.route('/new', {
  name: 'new-clothes',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Clothes_add_page"});
  }
});

// Route to edit clothes form page
loggedIn.route('/:_id/edit', {
  name: 'edit-clothes',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Clothes_add_page"});
  }
});

/**
 * END LOGGED IN ROUTES
 */

// TODO : 404 page
FlowRouter.notFound = {
  action() {  // for now we render homepage on 404
    BlazeLayout.render("App_body", { main: "Home_page"});
  },
};

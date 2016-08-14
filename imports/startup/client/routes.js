import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Meteor } from 'meteor/meteor';

// Loading templates
import '../../ui/layouts/app-body.js'; // main layout
import '../../ui/pages/home-page.js';
import '../../ui/pages/dressing-page.js';
import '../../ui/pages/profile-page.js';
import '../../ui/pages/clothes-add-page.js';
import '../../ui/pages/clothes-edit-page.js';
import '../../ui/pages/profile-edit-page.js';
import '../../ui/pages/search.js';
//import '../../ui/pages/viewCloth.js';

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
  // console.log(context)
  // if(!(Meteor.loggingIn() || Meteor.userId()) ) {
  //   route = FlowRouter.current();
  //   if(route.route.name !=== 'login') {
  //     Session.set('redrectAfterLogin', route.path);
  //   }
  //   FlowRouter.go('login');
  // }
}

// Route to homepage
exposed.route('/', {
  name: 'home',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Home_page"});
  }
});

// TODO :
// check if loggedIn -> going to profile
// if not loggedIn -> redirect to login page
//
// Route to current user's profile
exposed.route('/profile', {
  name: 'profile',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Profile_page"});
  }
});

// TODO :
// check if loggedIn -> going to personal dressing
// if not loggedIn -> redirect to a presentation of features
//                   \ or maybe : to login page 
// Route to current user's dressing
exposed.route('/dressing', {
  name: 'dressing',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Dressing_page"});
  }
});

// TODO :
// check if loggedIn -> going to personal infos
// if not loggedIn -> redirect to a presentation of features
//                   \ or maybe : to login page 
// Route to current user's dressing
exposed.route('/profile', {
  name: 'edit-profile',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Profile_edit_page"});
  }
});

// Route to new clothes form page
exposed.route('/new', {
  name: 'new-clothes',
  action: function() { 
    BlazeLayout.render("App_body", {main: "Clothes_add_page"});
  }
});

// Route to edit clothes form page
exposed.route('/edit/:_id', {
  name: 'edit-clothes',
  action: function(params) { 
    var toUpdate = Clothes.findOne({_id: params._id});
    if(toUpdate){
      BlazeLayout.render("App_body", {main: "Clothes_edit_page"});
    }
    else {
      FlowRouter.go('/404');
    }
  }
});

// Default route for cloth searching
FlowRouter.route('/search', {
  action: function(){
    BlazeLayout.render("App_body", {main: 'search'});
  }
});

// FIXME : proper cloth offer view
// Route to view clothes page
// FlowRouter.route('/view/:_id', {
//   action: function(params){
//     var toShow = Clothes.findOne({_id: params._id});
//     if(toShow){
//       BlazeLayout.render("App_body", {main: 'Clothes_view_page'});
//     }
//     else {
//       FlowRouter.go('/404');
//     }
//   }
// });

// TODO : 404 page
FlowRouter.notFound = {
  action() {  // for now we render homepage on 404
    BlazeLayout.render('App_body', { main: 'Home_page' });
  },
};

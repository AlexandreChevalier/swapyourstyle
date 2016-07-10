import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// Associated template
import './home-page.html';
// Needed components
import '../homepage/presentation.js';
import '../homepage/info-banner.js';
import '../homepage/theme-item.js';

Template.Home_page.onCreated(function homePageOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('userInfos');
  Meteor.subscribe('clothes');
});

Template.Home_page.onRendered(function() {
  $( document ).ready(function(){
    // Loading parallax for image blocks
    $(".parallax").parallax();
  });
});
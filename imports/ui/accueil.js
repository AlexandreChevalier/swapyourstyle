import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
import { userProfile } from '../api/userProfile.js';
import { Dressing } from '../api/dressing.js';
import { Clothes } from '../api/cloth.js';

import './task.js';
import './accueil.html';

// Importing blocks
import './blocks/header.js';
import './blocks/footer.js';
import './location/location.js';

import './blocks/presentation.js';
import './blocks/infoBlock.js';
import './blocks/themeBlock.js';
import './pages/userData.js';

Template.accueil.onCreated(function accueilOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
  Meteor.subscribe('userProfile');
  Meteor.subscribe('dressing');
  Meteor.subscribe('clothes');
});

Template.accueil.onRendered(function() {
  $( document ).ready(function(){
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $(".parallax").parallax();
  });
});

Template.accueil.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
  getLocation() {
    var pos = Geolocation.latLng();
    console.log(pos.lat, pos.lng);
  }
});

Template.accueil.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

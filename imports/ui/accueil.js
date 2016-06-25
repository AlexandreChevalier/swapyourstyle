import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { userProfile } from '../api/userProfile.js';
import { Clothes } from '../api/cloth.js';
import { Images } from '../api/image.js';

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
  Meteor.subscribe('userProfile');
  Meteor.subscribe('clothes');
  Meteor.subscribe('files.images.all');
});

Template.accueil.onRendered(function() {
  $( document ).ready(function(){
    $(".parallax").parallax();
  });
});
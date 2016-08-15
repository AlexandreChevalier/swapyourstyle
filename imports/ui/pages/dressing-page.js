/**
 * Created by Marc on 27/04/2016.
 */
import { Template } from 'meteor/templating';

import { Profiles } from '../../api/profiles/profiles.js';
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';

import './dressing-page.html';
import '../components/clothes-item.js';

Template.Dressing_page.onCreated(function(){
  Meteor.subscribe('clothes');
  console.log("Subscribing to clothes");
});

var delay = 100;

Template.Dressing_page.onRendered(function(){
  $( document ).ready(function(){
    // Animations
    $('#main')
      .velocity("fadeIn", { duration: 200 })
      .velocity({ opacity: 1 });
  });
});

Template.Dressing_page.helpers({
  clothes() {
    let clothes = Clothes.find(
      { ownerId: Meteor.userId() }, 
      { sort: { createdAt: -1 } }
    );
    if(clothes) { return clothes }
  }
});
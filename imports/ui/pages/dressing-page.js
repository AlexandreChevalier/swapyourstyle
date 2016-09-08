/**
 * Created by Marc on 27/04/2016.
 */
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Profiles } from '../../api/profiles/profiles.js';
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import { Dressings } from '../../api/dressings/dressings.js';

import './dressing-page.html';
import '../components/clothes-item.js';

Template.Dressing_page.onCreated(function(){
  Meteor.subscribe('personal_clothes');
  Session.set("editing", false);
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
  },
  dressings() { return Dressings },
  dressing() {
    return Dressings.findOne({ownerId:Meteor.userId()});
  },
  dressingName() {
    var dressing = Dressings.findOne({ownerId:Meteor.userId()});
    if(!dressing.name){
      dressing.name = "Mon dressing";
    }
    return dressing.name;
  },
  editing() { return Session.get("editing") }
});

Template.Dressing_page.events({
  "click .dressing-title": function(event, template) {
    Session.set("editing", true);
    template.$('.dressing-title input').focus();
    template.$('.dressing-title input').click();
  },
  "click": function(){
    Session.set("editing", false);
  }
});

var hooks = {
  onSuccess: function(formType, result) {
    Session.set("editing", false);
  }
};

AutoForm.addHooks('updateDressingForm', hooks);
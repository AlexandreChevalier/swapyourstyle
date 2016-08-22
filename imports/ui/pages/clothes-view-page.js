import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Images } from '../../api/images/images.js';

import { Clothes } from '../../api/clothes/clothes.js';
import './clothes-view-page.html';

Template.Clothes_view_page.onCreated(function () {

});

Template.Clothes_view_page.onRendered(function () {
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
    // Animations
    $('#main')
      .velocity("fadeIn", { duration: 500 })
      .velocity({ opacity: 1 });
  });
});

Template.Clothes_view_page.helpers({
  cloth() {
    let itemId = FlowRouter.getParam("_id");
    let cloth = Clothes.findOne({ "_id":itemId });
    if(cloth) { return cloth }
  }
});

Template.Clothes_view_page.events({

});
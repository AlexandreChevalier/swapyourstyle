import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from '../../api/images/images.js';

import { Clothes } from '../../api/clothes/clothes.js';
import { Dressings } from '../../api/dressings/dressings.js';
import { Profiles } from '../../api/profiles/profiles.js';
import './dressing-view-page.html';

Template.Dressing_view_page.onCreated(function () {

});

Template.Dressing_view_page.onRendered(function () {
  $( document ).ready(function(){
    
  });
});

Template.Dressing_view_page.helpers({
  dressing() {
    let dressing = Dressings.findOne({ "ownerId":FlowRouter.getParam("_id") });
    if(dressing) { return dressing }
  },
  clothes() {
    let clothes = Clothes.find(
      { ownerId: FlowRouter.getParam("_id") }, 
      { sort: { createdAt: -1 } }
    );
    if(clothes) { return clothes }
  }
});
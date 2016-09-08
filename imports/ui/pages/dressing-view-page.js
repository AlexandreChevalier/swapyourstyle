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
  getIllustration() {
    var profile = Profiles.findOne({"userId":FlowRouter.getParam("_id")});
    if(profile){
      var imageId = profile.avatarId;
      if(imageId){
        var item = Images.findOne({_id: imageId});
        if(item){
          var picture = Imgur.toThumbnail(item.url, Imgur.BIG_SQUARE);
          return picture;
        }
      }
    }
    return "/images/default_avatar.png";
  },
  getOwnerUserName() {
    var profile = Profiles.findOne({"userId":FlowRouter.getParam("_id")});
    if(profile){
      var userName = profile.userName;
      if(userName) { return userName; }
    }
    return "Anonyme";
  },
  getUserBio() {
    var profile = Profiles.findOne({"userId":FlowRouter.getParam("_id")});
    if(profile){
      var bio = profile.bio;
      if(bio) { return bio; }
    }
  },
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
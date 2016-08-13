/**
 * Template handler for editing clothes form
 * 
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import './clothes-edit-page.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

Template.Clothes_edit_page.onRendered(function clothesShowPageOnRendered() {
  $("#multidatespicker").multiDatesPicker({
    dateFormat: "dd/mm/yy"
  });
  var item = Clothes.findOne({_id: FlowRouter.current().params._id});
  var datesArray = item.disponibility;
  $("#multidatespicker").multiDatesPicker('addDates', datesArray);
  //needed so the select displays 
  $( document ).ready(function(){
    $('select').material_select();
  });
});

Template.Clothes_edit_page.onCreated(function () {
  Session.set("waitingForApiResponse", false);
  Session.set("imageCode", "");
  Session.set("image", "");
});

Template.Clothes_edit_page.helpers({
  Clothes: function(){
    return Clothes;
  },
  clothProfile: function(){
    var item = Clothes.findOne({_id: FlowRouter.current().params._id});
    return item;
  },
  getUpdateLegend: function(){
    return T9n.get("Updating infos on cloth");
  },
  getTradDressing: function(){
    return T9n.get("Dressing");
  },
  getSubmit: function(){
    return T9n.get("Submit");
  },
  getReset: function(){
    return T9n.get("Reset");
  },
  waitingForApiResponse: function () {
    return Session.get("waitingForApiResponse");
  },
  imageEmpty: function () {
    var item = Clothes.findOne({_id: FlowRouter.current().params._id});
    if(item.clothImage){
      return false;
    }
    return true;
  }
});

Template.Clothes_edit_page.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      Session.set('waitingForApiResponse', true);
      loadImageFileAsURL(e.currentTarget.files[0], function(response){
        if(response){
          Imgur.upload({
            image: Session.get("imageCode"),
            apiKey: "49240428869e3b2" //TODO : get from environment variable
          }, function (error, data) {
            if(error){
              console.log(error);
            }
            else {
              Images.insert({
                url: data.link,
                deleteHash: data.deletehash
              }, function(error, result) {
                if(error){
                  console.log(error);
                }
                else {
                  console.log(result);
                  Session.set("imageCode", "");
                  Session.set("image", result);
                  Session.set('waitingForApiResponse', false);
                }
              });
            }
          });
        }
        else {
          sweetAlert("error");
        }
      });
    }
  }
});

var Clothes_edit_pageHooks = {
  before: {
    // A l'ajout d'un nouveau vetement, 
    // on le lie a son propriétaire et son dressing
    update: function(doc){
      var dates = $("#multidatespicker").multiDatesPicker('getDates');
      if(dates.length > 0){
        doc.$set.disponibility = dates;
      }
      if(Session.get("image") != ""){
        doc.$set.clothImage = Session.get("image");
      }
      return doc;
    }
  },
  onSuccess: function (doc) {
    FlowRouter.go('/dressing');
  }
}
AutoForm.addHooks('updateClothForm', Clothes_edit_pageHooks);

function loadImageFileAsURL(image, callback) {
  var fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent) 
  {
    Session.set('imageCode', fileLoadedEvent.target.result);
    callback(true);
  };

  fileReader.readAsDataURL(image);
}
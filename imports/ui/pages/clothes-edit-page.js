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

Template.Clothes_edit_page.onRendered(function clothesShowPageOnRendered() {
  //needed so the select displays 
  $( document ).ready(function(){
    $('select').material_select();
  });
});

Template.Clothes_edit_page.onCreated(function () {
  Session.set("waitingForApiResponse", false);
  Session.set("image", "");
  Session.set("images", []);
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
  }
});

Template.Clothes_edit_page.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      Session.set('waitingForApiResponse', true);
      loadImageFileAsURL(e.currentTarget.files[0], function(response){
        if(response){
          Imgur.upload({
            image: Session.get("image"),
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
                  var arrayImages = Session.get("images");
                  if(arrayImages){
                    arrayImages.push(result);
                  }
                  else {
                    arrayImages = [result];
                  }
                  Session.set("image", "");
                  Session.set("images", arrayImages);
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
      var arrayImages = Session.get("images");
      if(arrayImages.length > 0){
        doc.$set.clothImage = arrayImages;
        console.log("doc : ", doc);
        return doc;
      }
      else {
        return doc;
      }
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
    Session.set('image', fileLoadedEvent.target.result);
    callback(true);
  };

  fileReader.readAsDataURL(image);
}
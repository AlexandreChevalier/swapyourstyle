/**
 * Template handler for adding clothes form
 * 
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import './clothes-add-page.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import 'meteor/deanius:promise';
import { encode } from 'node-base64-image';

// Components used inside the template
// import './app-not-found.js';

Template.Clothes_add_page.onRendered(function clothesShowPageOnRendered() {
  //this.getListId = () => FlowRouter.getParam('_id');
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
  });
});

Template.Clothes_add_page.onCreated(function () {
  Session.set("waitingForApiResponse", false);
  Session.set("image", "");
  Session.set("images", []);
});

Template.Clothes_add_page.helpers({
  // accessing our collection
  clothes: function(){
    return Clothes;
  },
  getUpdateLegend: function(){
    return T9n.get("Adding new cloth");
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

Template.Clothes_add_page.events({
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

var Clothes_add_pageHooks = {
  before: {
    // A l'ajout d'un nouveau vetement, 
    // on le lie a son propriétaire et son dressing
    insert: function(doc){
      doc.userId = Meteor.userId();
      var arrayImages = Session.get("images");
      if(arrayImages.length > 0){
        doc.clothImage = arrayImages;
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
AutoForm.addHooks('insertClothForm', Clothes_add_pageHooks);

function loadImageFileAsURL(image, callback) {
  var fileReader = new FileReader();

  fileReader.onload = function(fileLoadedEvent) 
  {
    Session.set('image', fileLoadedEvent.target.result);
    callback(true);
  };

  fileReader.readAsDataURL(image);
}
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Session } from 'meteor/session';
//import { encode } from 'node-base64-image';
//import { Images } from '../../api/images/images.js';
//import 'meteor/deanius:promise';

import { Clothes } from '../../api/clothes/clothes.js';
import './clothes-add-page.html';

// Default behavior : insert form
var isUpdate = false;
var defaultPrice = 10;
var defaultSize = 34;

Template.Clothes_add_page.onCreated(function () {
  clothToUpdate = Clothes.findOne({ "_id":FlowRouter.current().params._id });
  // If this template is loaded as an unpdate
  if(FlowRouter.current().route.name == "edit-clothes"){
    isUpdate = true; // the behavior is update

    defaultPrice = reactivePrice;
    if(clothToUpdate.allowSize){
      defaultSize = clothToUpdate.size;
    }
  }
  // Current price on the price slider 
  this.priceValue = new ReactiveVar(defaultPrice);
  // Current size on the size slider 
  this.sizeValue = new ReactiveVar(defaultSize);
  // Session.set("waitingForApiResponse", false);
  // Session.set("imageCode", "");
  // Session.set("image", []);
});

Template.Clothes_add_page.onRendered(function () {
  $( document ).ready(function(){
    // Switch to off on page load
    if($("#allowSize").is(":checked")){
      $("#allowSize").click();
    }
    // Loading material selects
    $('select').material_select();
    // Animations
    $('#main')
      .velocity("fadeIn", { duration: 500 })
      .velocity({ opacity: 1 });
    // Update form sliders
    $('#priceSlider .nouislider').val(defaultPrice);
    // FIXME : conditional on allowSize + switch on
    //$('#sizeSlider .nouislider').val(defaultSize);
  });
});

Template.Clothes_add_page.helpers({
  // Accessing our collection for autoform
  clothes() { return Clothes },
  // Reactive helpers for sliders
  currentSize() { return Template.instance().sizeValue.get() },
  currentPrice() { return Template.instance().priceValue.get() },
  /**
   * Update form helpers
   * When this form is called from a /:_id/edit route
   * the form is reused as an update form
   */
  isUpdate(){ return isUpdate },
  formType(){ 
    if (isUpdate) { return "update" }
    else { return "insert" }
  },
  clothToUpdate(){ 
    return Clothes.find({ "_id":FlowRouter.current().params });
  },
});

Template.Clothes_add_page.events({
  // On price slider change, update the current price value
  "change #priceSlider": function(event, template) {
    template.priceValue.set(parseFloat($('#priceSlider .nouislider').val()));
  },
  // On size slider change, update the current size value
  "change #sizeSlider": function(event, template) {
    template.sizeValue.set(parseFloat($('#sizeSlider .nouislider').val()));
  },
  //
  "live #allowSize": function(event, template) {
    $('#sizeSlider .nouislider').val(template.sizeValue.get());
  },
  // On reset button click, force values reset 
  "click .reset-btn": function(event, template) {
    // Reset reactive values for sliders
    template.priceValue.set(defaultPrice);
    template.sizeValue.set(defaultSize);
    // Reset sliders
    $('#priceSlider .nouislider').val(defaultPrice);
    $('#sizeSlider .nouislider').val(defaultSize);
    // Reset switch to unchecked
    if($("#allowSize").is(":checked")){
      $("#allowSize").click();
    }
  }

  // 'change #fileInput': function (e, template) {
  //   if (e.currentTarget.files && e.currentTarget.files[0]) {
  //     Session.set('waitingForApiResponse', true);
  //     loadImageFileAsURL(e.currentTarget.files[0], function(response){
  //       if(response){
  //         Imgur.upload({
  //           image: Session.get("imageCode"),
  //           apiKey: "49240428869e3b2" //TODO : get from environment variable
  //         }, function (error, data) {
  //           if(error){
  //             console.log(error);
  //           }
  //           else {
  //             Images.insert({
  //               url: data.link,
  //               deleteHash: data.deletehash
  //             }, function(error, result) {
  //               if(error){
  //                 console.log(error);
  //               }
  //               else {
  //                 console.log(result);
  //                 Session.set("imageCode", "");
  //                 Session.set("image", result);
  //                 Session.set('waitingForApiResponse', false);
  //               }
  //             });
  //           }
  //         });
  //       }
  //       else {
  //         sweetAlert("error");
  //       }
  //     });
  //   }
  // }
});

var hooks = {
  onSuccess: function(formType, result) {
    FlowRouter.go('/dressing');
  },
};

AutoForm.addHooks('insertClothForm', hooks);

// var Clothes_add_pageHooks = {
//   before: {
//     // A l'ajout d'un nouveau vetement, 
//     // on le lie a son propriétaire et son dressing
//     insert: function(doc){
//       // doc.ownerId = Meteor.userId();
//       // if(Session.get("image") != ""){
//       //   doc.clothImage = Session.get("image");
//       // }
//       // console.log("doc : ", doc);
//       // return doc;
//     }
//   },
//   onSuccess: function (doc) {
//     FlowRouter.go('/dressing');
//   }
// }
// AutoForm.addHooks('insertClothForm', Clothes_add_pageHooks);

// function loadImageFileAsURL(image, callback) {
//   var fileReader = new FileReader();

//   fileReader.onload = function(fileLoadedEvent) 
//   {
//     Session.set('imageCode', fileLoadedEvent.target.result);
//     callback(true);
//   };

//   fileReader.readAsDataURL(image);
// }
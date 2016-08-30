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
var updating = false;
var defaultPrice = 10;
var defaultSize = 34;

Template.Clothes_add_page.onCreated(function () {
  // If this template is loaded as an unpdate
  if(FlowRouter.current().route.name == "edit-clothes"){
    updating = true; // the behavior is update
  } else {
    updating = false;
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
    $(window).scrollTop(0);

    if (updating) { enableSize() }
    else { disableSize() }
    
    // Loading material selects
    $('select').material_select();
    // Animations
    $('#main')
      .velocity("fadeIn", { duration: 500 })
      .velocity({ opacity: 1 });
    // Update form sliders
    setSliderPrice(defaultPrice);
    setSliderSize(defaultSize);
  });

});

Template.Clothes_add_page.helpers({
  // Accessing our collection for autoform
  clothes() { return Clothes },
  // Reactive helpers for sliders
  currentSize() { return Template.instance().sizeValue.get() },
  currentPrice() { return Template.instance().priceValue.get() },
  /**
   * Update form helpers below
   * When this form is called from a /:_id/edit route
   * the form is reused as an update form
   */
  updating(){ return updating },
  formType(){ 
    if (updating) { return "update" }
    else { return "insert" }
  },
  clothToUpdate(){ 
    if (updating) {
      var id = FlowRouter.current().params;
      return Clothes.findOne({ "_id": id._id });
    } else { return "" }
  },
});

Template.Clothes_add_page.events({
  // On price slider change, update the current price value
  "change #priceSlider": function(event, template) {
    template.priceValue.set(parseFloat(getSliderPrice()));
  },
  // On size slider change, update the current size value
  "change #sizeSlider": function(event, template) {
    template.sizeValue.set(parseFloat(getSliderSize()));
  },
  // On reset button click, force values reset 
  "click .reset-btn": function(event, template) {
    // Reset reactive values for sliders
    template.priceValue.set(defaultPrice);
    template.sizeValue.set(defaultSize);
    // Reset sliders
    setSliderPrice(defaultPrice);
    setSliderSize(defaultSize);
    // Reset switch to unchecked
    disableSize();
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


/**
 * Utilities functions
 * For sliders and values
 */
var enableSize = function() {
  if(!$("#allowSize").is(":checked")){
    $("#allowSize").click();
  }
}

var disableSize = function() {
  if($("#allowSize").is(":checked")){
    $("#allowSize").click();
  }
}

var getSliderPrice = function() {
  return $('#priceSlider .nouislider').val();
}

var setSliderSize = function(value) {
  $('#sizeSlider .nouislider').val(value)
}

var getSliderSize = function() {
  return $('#sizeSlider .nouislider').val();
}

var setSliderPrice = function(value) {
  $('#priceSlider .nouislider').val(value);
}
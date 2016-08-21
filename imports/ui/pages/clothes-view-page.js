import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import magnificPopup from 'magnific-popup';
//import { Images } from '../../api/images/images.js';

import { Clothes } from '../../api/clothes/clothes.js';
import './clothes-view-page.html';

Template.Clothes_view_page.onCreated(function () {

});

Template.Clothes_view_page.onRendered(function () {
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
    // Image popup on click
    $('.image-popup').magnificPopup({
      type:'image',
      mainClass: 'mfp-with-zoom', // this class is for CSS animation below
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it
        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function
        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
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
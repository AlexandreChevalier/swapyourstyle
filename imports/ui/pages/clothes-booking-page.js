import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from '../../api/images/images.js';

import { Clothes } from '../../api/clothes/clothes.js';
import './clothes-booking-page.html';

Template.Clothes_booking_page.onCreated(function () {

});

Template.Clothes_booking_page.onRendered(function () {
  $( document ).ready(function(){
    var item = Clothes.findOne({_id: FlowRouter.current().params._id});
    var datesArray = item.notAvailable;
    $("#multidatespicker").multiDatesPicker({
      dateFormat: "dd/mm/yy",
      addDisabledDates: datesArray,
      maxPicks: 2,
      minDate: 0
    });
    $(window).scrollTop(0);
    // Loading material selects
    $('select').material_select();
    // Animations
    $('#main')
      .velocity("fadeIn", { duration: 500 })
      .velocity({ opacity: 1 });
  });
});

Template.Clothes_booking_page.helpers({
  cloth() {
    let itemId = FlowRouter.getParam("_id");
    let cloth = Clothes.findOne({ "_id":itemId });
    if(cloth) { return cloth }
  },
  getIllustration(imageId) {
    var item = Images.findOne({_id: imageId});
    if(item){
      var picture = Imgur.toThumbnail(item.url, Imgur.BIG_SQUARE);
      return picture;
    } else {
      return "/images/clothes.jpg";
    }
  }
});

Template.Clothes_booking_page.events({
  "click #multidatespicker": function (event, template) {
    var dates = $("#multidatespicker").multiDatesPicker('getDates');
    var result = "";
    for (var i = 0; i < dates.length; i++) {
      result += dates[i];
    }
    swal(result);
  }
});
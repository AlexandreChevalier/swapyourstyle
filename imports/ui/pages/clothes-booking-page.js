import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Email } from 'meteor/email';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from '../../api/images/images.js';

import { Clothes } from '../../api/clothes/clothes.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { Notifications } from '../../api/notifications/notifications.js';

import './clothes-booking-page.html';

Template.Clothes_booking_page.onCreated(function () {
  Session.set("totalPrice", 0);
});

var addedDates = [];

Template.Clothes_booking_page.onRendered(function () {
  $( document ).ready(function(){
    addedDates = [];
    var item = Clothes.findOne({_id: FlowRouter.current().params._id});
    
    var datesArray = [];
    var bookedArray = [];
    
    if(item.notAvailable){ datesArray = item.notAvailable; }
    if(!datesArray){ datesArray = []; }

    if(item.bookedPeriod){ bookedArray = item.bookedPeriod; }
    if(!bookedArray){ bookedArray = []; }

    var disabledDates = appendArrays(datesArray, bookedArray);
    if(disabledDates.length){
      $("#multidatespicker").multiDatesPicker({
        addDisabledDates: disabledDates,
        maxPicks: 2,
        minDate: 0,
        onSelect: dateSelected
      });
    } else {
      $("#multidatespicker").multiDatesPicker({
        maxPicks: 2,
        minDate: 0,
        onSelect: dateSelected
      });
    }
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
  },
  getPrice(){
    return Session.get("totalPrice");
  }
});

Template.Clothes_booking_page.events({
  "click #validate": function(event, template) {
    if(addedDates.length > 0){
      var stringDates = [];
      for (var i = 0; i < addedDates.length; i++) {
        stringDates.push(formattedDate(addedDates[i]));
      }
      let itemId = FlowRouter.getParam("_id");
      let cloth = Clothes.findOne({ "_id":itemId });
      let ownerProfile = Profiles.findOne({ "userId":cloth.ownerId });
      let selfProfile = Profiles.findOne({ "userId":Meteor.userId() });
      let swalText = "Voulez-vous envoyer ce message au propriétaire de l'objet \"<b>" + cloth.name + "</b>\" ?<br/><br/>"
      let messageText = "Bonjour,<br/>Je souhaiterais effectuer une réservation sur votre objet \"<b>" + cloth.name + "</b>\"";
      if(addedDates.length === 1){
        messageText += " le " + stringDates[0];
      }
      else {
        messageText += " du " + stringDates[0] + " au " + stringDates[stringDates.length - 1];
      }
      messageText += " pour la somme totale de " + Session.get("totalPrice") + " €.";
      swal({
        title: "Confirmer la demande",
        text: swalText + messageText,
        confirmButtonText: "Oui",
        showCancelButton: true,
        cancelButtonText: "Non",
        closeOnConfirm: false,
        html: true
      }, function(){
        Notifications.insert({
          sender: Meteor.userId(),
          recipient: cloth.ownerId,
          requestedDates: stringDates,
          targetedItemId: itemId,
          status: "En attente"
        });
        messageText += "<br/><br/>L'équipe de SwapYourStyle vous invite à vous rendre sur <a href='http://swapyourstyle.fr/notifications'>SwapYourStyle.fr</a> pour répondre à cette demande.<br/><br/>Merci et bonne journée !";
        Meteor.call('sendEmail', ownerProfile.email, "Demande de location", messageText);
        swal({
          title: "Succès !",
          text: "Le mail a bien été envoyé. Vous recevrez la réponse du propriétaire par mail.",
          type: "success",
          closeOnConfirm: true
          }, function(){
            FlowRouter.go("/");
        });
      });
    }
  }
});

var dateSelected = function() {
  var dates = $("#multidatespicker").multiDatesPicker('getDates');
  let itemId = FlowRouter.getParam("_id");
  let cloth = Clothes.findOne({ "_id":itemId });
  if(dates.length === 2 && addedDates.length < 2){
    var currentDate = new Date(dates[0]);
    var endDate = new Date(dates[1]);
    currentDate.setDate(currentDate.getDate() + 1);
    while(currentDate.getTime() != endDate.getTime()){
      var isDisabledDate = $("#multidatespicker").multiDatesPicker('gotDate', currentDate, 'disabled') !== false;
      if(isDisabledDate){
        addedDates = [];
        swal({
          title: "Période invalide",
          text: "Une des dates de la période choisie a été marquée comme indisponible par le propriétaire.",
          type: "error",
          confirmButtonText: "OK"
        });
        $('#multidatespicker').multiDatesPicker('removeDates', dates);
        break;
      }
      else {
        addedDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if(addedDates.length > 0){
      $('#multidatespicker').multiDatesPicker('addDates', addedDates);
      addedDates.push(new Date(dates[1]));
    }
  }
  else if(addedDates.length > 0){
    $('#multidatespicker').multiDatesPicker('removeDates', addedDates);
    addedDates = [];
  }
  else {
    addedDates.push(new Date(dates[0]));
  }
  Session.set("totalPrice", addedDates.length*cloth.price);
  if(addedDates.length > 0){
    $('#validate').removeClass('disabled');
  }
  else {
    $('#validate').addClass('disabled');
  }
}

function formattedDate(theDate) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [pad(theDate.getDate()), pad(theDate.getMonth()+1), theDate.getFullYear()].join('/');
}

function appendArrays(arr1, arr2) {
  for (var i = arr2.length - 1; i >= 0; i--) {
    arr1.push(arr2[i]);
  }
  return arr1;
}
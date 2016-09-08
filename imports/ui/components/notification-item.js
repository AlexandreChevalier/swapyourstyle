import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/images/images.js';

import { Clothes } from '../../api/clothes/clothes.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { Notifications } from '../../api/notifications/notifications.js';

import './notification-item.html';

Template.Notification_item.onRendered(function () {
  $(document).ready(function() {

  });
});

Template.Notification_item.helpers({
  isSender: function(senderId) {
    return senderId === Meteor.userId();
  },
  getSenderUserName: function(senderId) {
    var sender = Profiles.findOne({userId:senderId});
    if(sender) { if(sender.userName) { return sender.userName }};
  },
  getClothName: function(targetedItemId) {
    var cloth = Clothes.findOne({_id:targetedItemId});
    return cloth.name;
  },
  getDates: function(requestedDates) {
    if(requestedDates.length === 1){
      var messageText = "Le " + requestedDates[0];
    }
    else {
      var messageText = "Du " + requestedDates[0] + " au " + requestedDates[requestedDates.length - 1];
    }
    return messageText;
  },
  getPrice: function(notif) {
    var cloth = Clothes.findOne({_id:notif.targetedItemId});
    var timePeriod = notif.requestedDates.length;
    return timePeriod*cloth.price;
  },
  statusWaiting: function(status) {
    return status === "En attente";
  }
});

Template.Notification_item.events({
  "click #accept": function(event, template) {
    var notif = template.data.notification;
    var askerProfile = Profiles.findOne({ "userId":notif.sender });
    var selfProfile = Profiles.findOne({ "userId":Meteor.userId() });
    var cloth = Clothes.findOne({_id:notif.targetedItemId});
    swal({
      title: "Confirmation",
      text: "Accepter la demande ?",
      confirmButtonText: "Oui",
      showCancelButton: true,
      cancelButtonText: "Non",
      closeOnConfirm: false,
    }, function(){
      Notifications.update(notif._id, {
        $set: {
          status: "Accepté",
          read: true
        }
      });
      var arrayDates = cloth.bookedPeriod;
      if(!arrayDates){
        arrayDates = [];
      }
      var newArray = appendArrays(arrayDates, toUSFormat(notif.requestedDates));
      Clothes.update(notif.targetedItemId, {
        $set: {
          bookedPeriod: newArray
        }
      });
      var messageText = "Bonjour !<br/><br/>Votre demande a été acceptée par " + selfProfile.userName + ".<br/><br/>";
      messageText += "Vous pouvez le contacter pour organiser les détails :<br/>";
      if(selfProfile.email){
        messageText += "- Par mail à l'adresse <a href='mailto:'" + selfProfile.email + "'>" + selfProfile.email + "</a><br/>";
      }
      if(selfProfile.phoneNumber){
        messageText += "- Par téléphone au numéro <b>" + selfProfile.phoneNumber + "</b><br/><br/>";  
      }
      messageText += "L'équipe de SwapYourStyle vous remercie d'avoir utilisé notre application.";
      if(askerProfile.email){
        Meteor.call('sendEmail', askerProfile.email, "Demande Acceptée", messageText);
        swal({
          title: "Succès !",
          text: "Le mail a bien été envoyé. Le demandeur vous contactera sous peu.",
          type: "success",
          closeOnConfirm: true
          }, function(){
            FlowRouter.go("/notifications");
        });
      }
    });
  },
  "click #deny": function(event, template) {
    var notif = template.data.notification;
    var askerProfile = Profiles.findOne({ "userId":notif.sender });
    swal({
      title: "Confirmation",
      text: "Refuser la demande ?",
      confirmButtonText: "Oui",
      showCancelButton: true,
      cancelButtonText: "Non",
      closeOnConfirm: false,
    }, function(){
      Notifications.update(notif._id, {
        $set: {
          status: "Refusé",
          read: true
        }
      });
      if(askerProfile.email){
        var messageText = "Désolé,<br/><br/>Votre demande a été refusée par le propriétaire du vêtement.<br/><br/>";
        messageText += "L'équipe de SwapYourStyle vous remercie d'avoir utilisé notre application et espère vous revoir bientôt.";
        Meteor.call('sendEmail', askerProfile.email, "Demande de location", messageText);
        swal({
          title: "Refus Enregistré",
          text: "La demande a été refusée.",
          type: "success",
          closeOnConfirm: true
          }, function(){
            FlowRouter.go("/notifications");
        });
      }
    });
  }
});

function appendArrays(arr1, arr2) {
  for (var i = arr2.length - 1; i >= 0; i--) {
    arr1.push(arr2[i]);
  }
  return arr1;
}

function toUSFormat(dateArray){
  var newArray = [];
  for (var i = dateArray.length - 1; i >= 0; i--) {
    let tmpString = dateArray[i];
    let tmpArray = tmpString.split("/");
    tmpString = tmpArray[1] + "/" + tmpArray[0] + "/" + tmpArray[2];
    newArray.push(tmpString);
  }
  return newArray;
}
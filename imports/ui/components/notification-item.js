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
    return sender.userName;
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
    swal({
      title: "Confirmer",
      text: "Êtes-vous sûr de vouloir accepter ? Nous enverrons vos coordonnées au demandeur par mail.",
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
      var messageText = "Bonjour !<br/><br/>Votre demande a été acceptée par " + selfProfile.userName + ".<br/><br/>";
      messageText += "Vous pouvez le contacter pour organiser les détails :<br/>";
      if(selfProfile.email){
        messageText += "- Par mail à l'adresse <a href='mailto:'" + selfProfile.email + "'>" + selfProfile.email + "</a><br/>";
      }
      if(selfProfile.phoneNumber){
        messageText += "- Par téléphone au numéro <b>" + selfProfile.phoneNumber + "</b><br/><br/>";  
      }
      messageText += "L'équipe de SwapYourStyle vous remercie d'avoir utilisé notre application.";
      Meteor.call('sendEmail', askerProfile.email, selfProfile.email, "Demande Acceptée", messageText);
      swal({
        title: "Succès !",
        text: "Le mail a bien été envoyé. Le demandeur vous contactera sous peu.",
        type: "success",
        closeOnConfirm: true
        }, function(){
          FlowRouter.go("/notifications");
      });
    });
  },
  "click #deny": function(event, template) {
    var notif = template.data.notification;
    var askerProfile = Profiles.findOne({ "userId":notif.sender });
    var selfProfile = Profiles.findOne({ "userId":Meteor.userId() });
    swal({
      title: "Confirmer",
      text: "Êtes-vous sûr de vouloir refuser ?",
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
      var messageText = "Désolé,<br/><br/>Votre demande a été refusée par le propriétaire du vêtement.<br/><br/>";
      messageText += "L'équipe de SwapYourStyle vous remercie d'avoir utilisé notre application et espère vous revoir bientôt.";
      Meteor.call('sendEmail', ownerProfile.email, selfProfile.email, "Demande de location", messageText);
      swal({
        title: "Refus Enregistré",
        text: "La demande a été refusée.",
        type: "success",
        closeOnConfirm: true
        }, function(){
          FlowRouter.go("/notifications");
      });
    });
  }
});
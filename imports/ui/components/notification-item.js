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
  getSenderUserName: function(senderId) {
    var sender = Profiles.findOne({userId:senderId});
    return sender.userName;
  },
  getMessageText: function(notif) {
    var cloth = Cloth.findOne({_id:notif.targetedItemId});
    var addedDates = notif.requestedDates;
    var messageText = "Bonjour,<br/>Je souhaiterais effectuer une réservation sur votre objet \"<b>" + cloth.name + "</b>\"";
      if(addedDates.length === 1){
        messageText += " le " + stringDates[0];
      }
      else {
        messageText += " du " + stringDates[0] + " au " + stringDates[stringDates.length - 1];
      }
      messageText += " pour la somme totale de " + addedDates.length*cloth.price + " €.";
    return messageText;
  }
});
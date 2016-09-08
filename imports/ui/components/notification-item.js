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
  }
});
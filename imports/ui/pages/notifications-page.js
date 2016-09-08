import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { Notifications } from '../../api/notifications/notifications.js';
import './notifications-page.html';
import '../components/notification-item.js';

Template.Notifications_page.onCreated(function () {

});

Template.Notifications_page.onRendered(function () {


});

Template.Notifications_page.helpers({
  userNotifications() {
    let notifications = Notifications.find(
      {$or:[{ recipient: Meteor.userId() },{ sender: Meteor.userId() }]}, 
      { sort: { read:false, createdAt: -1 } }
    );
    if(notifications) { return notifications }
  }
});

Template.Notifications_page.events({

});
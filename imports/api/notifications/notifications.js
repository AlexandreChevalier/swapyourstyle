import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Dressings collection definition.
 */
export const Notifications = new Mongo.Collection('notifications');

if (Meteor.isServer) {
  Meteor.publish('notifications', function(){
    var data = Notifications.find();
    if(data){
      console.log("Publishing Notifications");
      return data;
    }
    return this.ready();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('notifications');
  console.log("Subscribing to Notifications");
}

/* Profiles schema definition */
Notifications.schema = new SimpleSchema({
    "sender": {
        type: String //userId de celui qui envoie
    },
    "recipient": {
        type: String //userId du destinataire
    },
    "requestedDates": {
        type: [String] //array de dates
    },
    "targetedItemId": {
        type: String //id du vetement demandé
    },
    "status": {
        type: String //pending/accepted/rejected/over  (par exemple)
    }
});

Notifications.attachSchema(Notifications.schema);

Notifications.allow({
  insert: function(userId, doc) {
    // only allow inserting if you are logged in
    return !! userId;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
  },
  remove: function(userId, doc) {
    // only allow removing if you are logged in
    return !! userId; 
  },
});
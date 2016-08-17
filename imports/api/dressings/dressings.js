import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Dressings collection definition.
 */
export const Dressings = new Mongo.Collection('dressings');

if (Meteor.isServer) {
  Meteor.publish('dressings', function(){
    Dressings.find({ "owner" : this.userId });
    return this.ready();
    console.log("Dressings published");
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('dressings');
  console.log("Subscribing to dressings");
}

/* Profiles schema definition */
Dressings.schema = new SimpleSchema({
  "owner": {
    type: String
  },
  "name": {
    type: String
  }
});

Dressings.attachSchema(Dressings.schema);

Dressings.allow({
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

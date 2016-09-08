import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Dressings collection definition.
 */
export const Dressings = new Mongo.Collection('dressings');

if (Meteor.isServer) {
  Meteor.publish('dressings', function(){
    var data = Dressings.find();
    if(data){
      console.log("Publishing Dressings");
      return data;
    }
    return this.ready();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('dressings');
  console.log("Subscribing to Dressings");
}

/* Profiles schema definition */
Dressings.schema = new SimpleSchema({
  "ownerId": {
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

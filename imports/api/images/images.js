import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Images collection definition.
 */
export const Images = new Mongo.Collection('images');

if (Meteor.isServer) {
  Meteor.publish('images', function(){
    var data = Images.find();
    if(data){
      console.log("Publishing Images");
      return data;
    }
    return this.ready();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('images');
  console.log("Subscribing to Images");
}

/* Images schema definition */
Images.schema = new SimpleSchema({
  "url": {
    type: String
  },
  "deleteHash": {
    type: String
  }
});

Images.attachSchema(Images.schema);

Images.allow({
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

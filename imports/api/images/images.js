import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Images collection handler
 * 
 * @author Marc Gilbert
 */
export const Images = new Mongo.Collection('images');

if (Meteor.isServer){
  // Only publish clothes that are public or belong to the current user
  Meteor.publish('images', function imagesPublication() {
    return Images.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

// Deny all client-side updates since we will be 
// using methods to manage this collection
/*Clothes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});*/

// TODO : better schema
Images.schema = new SimpleSchema({
  url: {
    type: String
  },
  deleteHash: {
    type: String
  }
});

Images.attachSchema(Images.schema);

// TODO : is this useful with Methods ?
Images.allow({
  //on vérifie que l'utilisateur a bien le droit de modifier l'objet
  insert: function(userId, doc) {
    return doc;
  },
  update: function(userId, doc) {
    return doc;
  }
});

// TODO refactor helpers :
// Define appropriate or needed ones
/*Clothes.helpers({
  
  // A cloth is considered to be private 
  // if it has a userId set
  isPrivate() {
    return !!this.userId;
  },
  // TODO better helper
  isLastPublicCloth() {
    const publicClothCount = Clothes.find({ userId: { $exists: false } }).count();
    return !this.isPrivate() && publicClothCount === 1;
  },
  // Is user the owner of this (cloth) ?
  editableBy(userId) {
    if (!this.userId) { return true; }
    return this.userId === userId;
  },
  // Get the list of all clothes
  clothes() {
    return Clothes.find(
      { clothId: this._id }, 
      { sort: { createdAt: -1 } 
    });
  }

});*/
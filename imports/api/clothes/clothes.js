import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Clothes collection (dressing) handler
 * 
 * @author Marc Gilbert
 * @author Alexandre Chevalier
 */
export const Clothes = new Mongo.Collection('clothes');

// Deny all client-side updates since we will be 
// using methods to manage this collection
Clothes.deny({
  // insert() { return true; },
  // update() { return true; },
  // remove() { return true; },
});

// TODO : better schema
Clothes.schema = new SimpleSchema({
  name: { 
    type: String,
    label: "Name"
  },
  type: { 
    type: String,
    label: "Type"
  },
  size: { 
    type: String,
    label: "Size"
  },
  description: { 
    type: String,
    optional : true,
    max: 300
  },
});

Clothes.attachSchema(Clothes.schema);

/*// TODO : is this useful with Methods ?
Clothes.allow({
  // Checking user can add/update his clothes
  insert: function(userId, doc) {
    return doc && (userId === doc.userId);
  },
  update: function(userId, doc) {
    return doc && (userId === doc.userId);
  }
});*/

Clothes.publicFields = {
  name: 1,
  userId: 1,
};

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
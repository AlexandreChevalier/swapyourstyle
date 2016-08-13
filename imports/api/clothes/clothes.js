import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Images } from '../images/images.js';

/**
 * Clothes collection (dressing) handler
 * 
 * @author Marc Gilbert
 */
export const Clothes = new Mongo.Collection('clothes');

if (Meteor.isServer){
  // Only publish clothes that are public or belong to the current user
  Meteor.publish('clothes', function clothesPublication() {
    return Clothes.find({
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
Clothes.schema = new SimpleSchema({
  userId: {
    type: String
  },
  clothName: {
    type: String,
    optional: true,
    label: T9n.get("Cloth Name")
  },
  clothType: {
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return Meteor.settings.public.clothType;
      }
    },
    optional: true,
    label: T9n.get("Cloth Type")
  },
  clothTheme: {
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return Meteor.settings.public.clothTheme;
      }
    },
    optional: true,
    label: T9n.get("Cloth Theme")
  },
  clothColor: {
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return Meteor.settings.public.clothColor;
      }
    },
    optional: true,
    label: T9n.get("Cloth Color")
  },
  clothGender: {
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return Meteor.settings.public.clothGender;
      }
    },
    optional: true,
    label: T9n.get("Cloth Gender")
  },
  clothSize: {
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return Meteor.settings.public.clothSize;
      }
    },
    optional: true,
    label: T9n.get("Cloth Size")
  },
  clothImage: {
    type: String,
    optional: true,
    label: T9n.get("Cloth Image")
  },
  clothDescr: {
    type: String,
    optional: true,
    label: T9n.get("Cloth Description")
  },
  disponibility: {
    type: [String],
    optional: true,
    label: T9n.get("Disponibility")
  },
  clothPrice: {
    type: Number,
    decimal: true,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "range",
        min: 1,
        max: 150,
        step: 0.5
      }
    },
    label: T9n.get("Cloth Price")
  }
});

Clothes.attachSchema(Clothes.schema);

// TODO : is this useful with Methods ?
Clothes.allow({
  //on vérifie que l'utilisateur a bien le droit de modifier l'objet
  insert: function(userId, doc) {
    return doc && (userId === doc.userId);
  },
  update: function(userId, doc) {
    return doc && (userId === doc.userId);
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
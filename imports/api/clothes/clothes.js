import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Clothes collection (dressing) handler
 */
export const Clothes = new Mongo.Collection('clothes');

// Deny all client-side updates since we will be 
// using methods to manage this collection
Clothes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

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
        return [
          {label: T9n.get("Top"), value: "Top"},
          {label: T9n.get("Bottom"), value: "Bottom"},
          {label: T9n.get("Shoes"), value: "Shoes"}
        ];
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
        return [
          {label: T9n.get("Wedding"), value: "Wedding"},
          {label: T9n.get("Party"), value: "Party"},
          {label: T9n.get("Casual"), value: "Casual"}
        ];
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
        return [
          {label: T9n.get("Blue"), value: "Blue"},
          {label: T9n.get("Red"), value: "Red"},
          {label: T9n.get("Green"), value: "Green"},
          {label: T9n.get("White"), value: "White"},
          {label: T9n.get("Black"), value: "Black"},
          {label: T9n.get("Brown"), value: "Brown"},
          {label: T9n.get("Yellow"), value: "Yellow"},
          {label: T9n.get("Purple"), value: "Purple"},
          {label: T9n.get("Pink"), value: "Pink"},
          {label: T9n.get("Gray"), value: "Gray"}
        ];
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
        return [
          {label: T9n.get("Male"), value: "Male"},
          {label: T9n.get("Female"), value: "Female"},
          {label: T9n.get("Unisex"), value: "Unisex"}
        ];
      }
    },
    optional: true,
    label: T9n.get("Cloth Gender")
  },
  clothSize: {
    type: String,
    optional: true,
    label: T9n.get("Cloth Size")
  },
  clothImage: {
    type: [String],
    optional: true,
    label: T9n.get("Cloth Images")
  },
  clothDescr: {
    type: String,
    optional: true,
    label: T9n.get("Cloth Description")
  }
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
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Images } from '../images/images.js';
import { clothes_properties } 
  from '../../../lib/properties/clothes_properties.js';
  var properties = clothes_properties;

/**
 * Clothes collection definition.
 */
export const Clothes = new Mongo.Collection('clothes');

if (Meteor.isServer) {
  Clothes._ensureIndex({ name:1, theme:1, size:1 });
  Meteor.publish('clothes', () => Clothes.find());
  console.log("Publishing clothes");
}
if (Meteor.isClient) {
  Meteor.subscribe('clothes');
  console.log("Subscribing to clothes");
}

/* Clothes schema definition */
Clothes.schema = new SimpleSchema({
  'ownerId': { type: String },
  'name': {
    type: String,
    optional: true,
    label: T9n.get("Cloth Name")
  },
  'type': {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez un type)",
      options: function () { return properties.types }
    },
    optional: true,
    label: T9n.get("Cloth Type")
  },
  'theme': {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez un thème)",
      options: function () { return properties.themes }
    },
    optional: true,
    label: T9n.get("Cloth Theme")
  },
  'color': {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez une couleur)",
      options: function () { return properties.colors }
    },
    optional: true,
    label: T9n.get("Cloth Color")
  },
  'gender': {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez un genre)",
      options: function () { return properties.genders }
    },
    optional: true,
    label: T9n.get("Cloth Gender")
  },
  'size': {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez une taille)",
      options: function () { return properties.sizes }
    },
    optional: true,
    label: T9n.get("Cloth Size")
  },
  'image': {
    type: String,
    optional: true,
    label: T9n.get("Cloth Image")
  },
  'description': {
    type: String,
    optional: true,
    label: T9n.get("Cloth Description")
  },
  'disponibility': {
    type: [Date],
    optional: true,
    label: T9n.get("Disponibility"),
    autoform: {
      type:"pickadate",
      pickadateOptions: {
        multiple: true,
        selectYears: true,
        selectMonths: true,
        format: "dd mmmm yyyy"
      }
    }
  },
  'price': {
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
  },
});

Clothes.attachSchema(Clothes.schema);

Clothes.allow({
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

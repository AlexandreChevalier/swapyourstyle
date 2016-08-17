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
  Meteor.publish('clothes', function(){
    Clothes.find();
    return this.ready();
    console.log("Clothes published");
  });
  Clothes._ensureIndex({ name:1, theme:1, size:1 });
}

if (Meteor.isClient) {
  // Meteor.subscribe('clothes');
  // console.log("Subscribing to clothes");
}

/* Clothes schema definition */
Clothes.schema = new SimpleSchema({
  "ownerId" : {
    type: String,
    autoValue: function () { return this.userId }
  },
  "name": {
    type: String,
    optional: true,
    label: T9n.get("Cloth Name")
  },
  "type": {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez un type)",
      options: function () { return properties.types }
    },
    optional: true,
    label: T9n.get("Cloth Type")
  },
  "theme": {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez un thème)",
      options: function () { return properties.themes }
    },
    optional: true,
    label: T9n.get("Cloth Theme")
  },
  "color": {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez une couleur)",
      options: function () { return properties.colors }
    },
    optional: true,
    label: T9n.get("Cloth Color")
  },
  "gender": {
    type: String,
    autoform: {
      type: "select",
      firstOption: "(Choisissez un genre)",
      options: function () { return properties.genders }
    },
    optional: true,
    label: T9n.get("Cloth Gender")
  },
  "allowSize": {
    type: Boolean,
    autoform: {
      type:"switch",
      trueLabel:"Oui",
      falseLabel:"Non"
    },
    defaultValue: false,
    optional: true,
    label: "Indiquer une taille ?",

  },
  "size": {
    type: Number,
    max: 54,
    min: 32,
    autoform: {
      type: "noUiSlider",
      noUiSliderOptions: {
        start: 34,
        step: 2,
      },  
      noUiSlider_pipsOptions: {
        mode: 'steps',
        density: 2,
      }
    },
    optional: true,
    label: T9n.get("Cloth Size")
  },
  "image": {
    type: String,
    optional: true,
    label: T9n.get("Cloth Image")
  },
  "description": {
    type: String,
    optional: true,
    label: T9n.get("Cloth Description")
  },
  "price": {
    type: Number,
    max: 100,
    min: 1,
    decimal: true,
    autoform: {
      type: "noUiSlider",
      noUiSliderOptions: {
        start: 10,
        connect: 'lower',
        step: .5,
      },
      noUiSlider_pipsOptions: {
        mode: 'values',
        values: [1, 100],
        density: 25,
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

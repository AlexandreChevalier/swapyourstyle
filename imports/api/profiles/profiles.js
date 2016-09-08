import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Profiles collection definition.
 */
export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
  Meteor.publish('profiles', function(){
    var data = Profiles.find();
    if(data){
      console.log("Publishing Profiles");
      return data;
    }
    return this.ready();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('profiles');
  console.log("Subscribing to Profiles");
}

/* Address sub-schema definition */
addressSchema = new SimpleSchema({
  "street": {
    type: String,
    label: T9n.get("Street")
  },
  "postalCode": {
    type: String,
    max: 5,
    regEx:/^\d+$/,
    label: T9n.get("Postal Code")
  },
  "city": {
    type: String,
    label: T9n.get("City")
  },
  "country": {
    type: String,
    label: T9n.get("Country")
  }
});

/* Profiles schema definition */
Profiles.schema = new SimpleSchema({
  "userId": {
    type: String
  },
  "userName": {
    type: String,
    optional: true
  },
  "email": {
    type: String,
    optional: true
  },
  "firstName": {
    type: String,
    optional: true,
    label: T9n.get("Firstname")
  },
  "lastName": {
    type: String,
    optional: true,
    label: T9n.get("Lastname")
  },
  "birthdate": {
    type: Date,
    optional: true,
    label: T9n.get("Birthdate"),
    autoform: {
      type:"pickadate",
      pickadateOptions: {
        selectYears: true,
        selectMonths: true,
        format: "dd mmmm yyyy"
      }
    }
  },
  "gender": {
      type: String,
    autoform: {
      type: "select",
      label: T9n.get("Gender"),
      firstOption: "(Choisissez)",
      options: function () {
        return [
          {label: T9n.get("Male"), value: "Male"},
          {label: T9n.get("Female"), value: "Female"},
          {label: T9n.get("Other"), value: "Other"}
        ];
      }
    },
    optional: true
  },
  "phoneNumber" : {
    type: String,
    max: 10,
    regEx: /^\d+$/,
    label: T9n.get("Phone Number"),
    optional: true
  },
  "bio": {
    type: String,
    max: 500,
    optional: true,
    label: T9n.get("Bio")
  },
  "address": {
    type: addressSchema,
    optional: true,
    label: T9n.get("Address")
  }
});

Profiles.attachSchema(Profiles.schema);

Profiles.allow({
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

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/**
 * Profiles collection definition.
 */
export const Profiles = new Mongo.Collection('profiles');

if (Meteor.isServer) {
  // Only publish infos that are public or belong to the current user
  Meteor.publish('profiles', function imagesPublication() {
    return Profiles.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

/* Address sub-schema definition */
addressSchema = new SimpleSchema({
  'street': {
    type: String,
    label: T9n.get("Street")
  },
  'postalCode': {
    type: String,
    max: 5,
    regEx:/^\d+$/,
    label: T9n.get("Postal Code")
  },
  'city': {
    type: String,
    label: T9n.get("City")
  },
  'country': {
    type: String,
    label: T9n.get("Country")
  }
});

Profiles.schema = new SimpleSchema({
  'userId': {
    type: String
  },
  'firstName': {
    type: String,
    optional: true,
    label: T9n.get("Firstname")
  },
  'lastName': {
    type: String,
    optional: true,
    label: T9n.get("Lastname")
  },
  'birthdate': {
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
  'gender': {
      type: String,
    autoform: {
      type: "select",
      label: T9n.get("Gender"),
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
  'phoneNumber' : {
    type: String,
    max: 10,
    regEx: /^\d+$/,
    label: T9n.get("Phone Number"),
    optional: true
  },
  'bio': {
    type: String,
    max: 500,
    optional: true,
    label: T9n.get("Bio")
  },
  'address': {
    type: addressSchema,
    optional: true,
    label: T9n.get("Address")
  },
  'dressingName': {
    type:String,
    optional: true,
    label: T9n.get("Dressing Name")
  }
});

Profiles.attachSchema(Profiles.schema);

Profiles.allow({
  // Checking user can update his infos
  update: function(userId, doc) {
    return doc && (userId === doc.userId);
  },
  insert: function(userId, doc) {
    return false;
  }
});
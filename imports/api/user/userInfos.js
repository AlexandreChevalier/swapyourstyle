import { Mongo } from 'meteor/mongo';

/**
 * UserInfos collection handler
 * 
 * @author Marc Gilbert
 * @author Alexandre Chevalier
 */
export const UserInfos = new Mongo.Collection("userInfos");

// TODO refactor in api/user/server/publications.js
if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('userInfos', function userInfosPublication() {
    return userInfos.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

addressSchema = new SimpleSchema({
  //TODO final formatted date
  street: {
    type: String,
    label: T9n.get("Street")
  },
  postalCode: {
    type: String,
    max: 5,
    regEx:/^\d+$/,
    label: T9n.get("Postal Code")
  },
  city: {
    type: String,
    label: T9n.get("City")
  },
  country: {
    type: String,
    label: T9n.get("Country")
  }
});

UserInfos.schema = new SimpleSchema({
  userId: {
    type: String
  },
  firstName: {
    type: String,
    optional: true,
    label: T9n.get("Firstname")
  },
  lastName: {
    type: String,
    optional: true,
    label: T9n.get("Lastname")
  },
  birthdate: {
    type: Date,
    optional: true,
    label: T9n.get("Birthdate"),
    autoform: {
      type:"pickadate"
    }
  },
  gender: {
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
  phoneNumber : {
    type: String,
    max: 10,
    regEx: /^\d+$/,
    label: T9n.get("Phone Number"),
    optional: true
  },
  bio: {
    type: String,
    max: 500,
    optional: true,
    label: T9n.get("Bio")
  },
  address: {
    type: addressSchema,
    optional: true,
    label: T9n.get("Address")
  },
  dressingName: {
    type:String,
    optional: true,
    label: T9n.get("Dressing Name")
  }
})

UserInfos.attachSchema(UserInfos.schema);

UserInfos.allow({
  // Checking user can update his infos
  update: function(userId, doc) {
    return doc && (userId === doc.userId);
  }
});
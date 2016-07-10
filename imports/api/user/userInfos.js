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
});

UserInfos.schema = new SimpleSchema({
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  address: { type: String }
})

UserInfos.attachSchema(UserInfos.schema);

UserInfos.allow({
  // Checking user can update his infos
  update: function(userId, doc) {
    return doc && (userId === doc.userId);
  }
});
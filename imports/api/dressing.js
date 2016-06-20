/*
created by Marc G
29/05/2016
*/
//import { Mongo } from 'meteor/mongo';
import { Clothes } from './cloth.js';

export const Dressing = new Mongo.Collection("dressing");

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('dressing', function dressingPublication() {
    return Dressing.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Dressing.attachSchema(new SimpleSchema({
	userId: {
		type: String
	},
	dressingName: {
		type:String,
        optional: true,
        label: T9n.get("Dressing Name")
	},
    clothes: {
        type: [Clothes],
        optional: true
    }
}));

Dressing.allow({
  update: function(userId, doc) {
    return doc && (userId === doc.userId);
  }
});

import { Meteor } from 'meteor/meteor';

import { Clothes } from '../clothes.js';

// Only publish clothes that are public or belong to the current user
Meteor.publish('clothes.public', function clothesPublication() {
  return Clothes.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId },
    ],
  });
});
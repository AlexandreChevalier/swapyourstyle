import { Meteor } from 'meteor/meteor';

import { UserInfos } from '../userInfos.js';

// Only publish clothes that are public or belong to the current user
Meteor.publish('userInfos', function userInfosPublication() {
  return UserInfos.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId },
    ],
  });
});
/**
 * Methods for Clothes collection
 *  insert : for creating clothes
 *  remove : for deleting clothes
 */
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Clothes } from './clothes.js';

const CLOTH_ID_ONLY = new SimpleSchema({
  listId: { type: String },
}).validator();

/**
 * Insert Method for Clothes collection 
 */
export const insert = new ValidatedMethod({
  name: 'clothes.insert',
  validate: new SimpleSchema({}).validator(),
  run() {
    return Clothes.insert({});
  },
});

/**
 * Remove Method for Clothes collection 
 */
export const remove = new ValidatedMethod({
  name: 'clothes.remove',
  validate: CLOTH_ID_ONLY,
  run({ clothId }) {
    const cloth = Clothes.findOne(clothId);

    if (!cloth.editableBy(this.userId)) {
      throw new Meteor.Error('clothes.remove.accessDenied',
        'You don\'t have permission to remove this cloth.');
    }
    // TODO define isLastPublicCloth in clothes.js helpers
    if (cloth.isLastPublicCloth()) {
      throw new Meteor.Error('clothes.remove.lastPublicCloth',
        'Cannot delete the last public cloth.');
    }

    Clothes.remove(clothId);
  },
});
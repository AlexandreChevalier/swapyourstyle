import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/images/images.js';

import './clothes-item.html';

Template.Clothes_item.onRendered(function clothesItemOnRendered() {
  $( document ).ready(function(){

  });
});

Template.Clothes_item.helpers({
  getIllustration(clothImage) {
    var item = Images.findOne({_id: clothImage});
    var picture = Imgur.toThumbnail(item.url, Imgur.BIG_SQUARE);
    return picture;
  }
});


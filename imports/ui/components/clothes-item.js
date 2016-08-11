import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/images/images.js';
import { Profiles } from '../../api/profiles/profiles.js';

import './clothes-item.html';

Template.Clothes_item.helpers({
  getIllustration(clothImage) {
    var item = Images.findOne({_id: clothImage});
    var picture = Imgur.toThumbnail(item.url, Imgur.BIG_SQUARE);
    return picture;
  },
  getOwnerUserName(userId){
  	var owner = Meteor.users.findOne({_id: userId});
  	return owner.username;
  },
  getCity(userId){
  	var info = Profiles.findOne({userId: userId});
  	return info.address.city;
  },
  accessMessage(userId){
    var owner = Meteor.users.findOne({_id: userId});
    if(owner){
      return "Modifier l'offre";
    }
    else {
      return "Consulter l'offre";
    }
  },
  accessRoute(cloth){
    var owner = Meteor.users.findOne({_id: cloth.userId});
    if(owner){
      return "/edit/" + cloth._id;
    }
    else {
      return "/viewCloth/" + cloth._id;
    }
  }
});


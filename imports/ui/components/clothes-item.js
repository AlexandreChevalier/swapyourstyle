import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/images/images.js';
import { Profiles } from '../../api/profiles/profiles.js';

import './clothes-item.html';

Template.Clothes_item.helpers({
  getIllustration(imageId) {
    var item = Images.findOne({_id: imageId});
    if(item){
      var picture = Imgur.toThumbnail(item.url, Imgur.BIG_SQUARE);
      return picture;
    } else {
      return "/images/clothes.jpg";
    }
  },
  getOwnerUserName(userId){
  	var owner = Meteor.users.findOne({_id: userId});
  	return owner.username;
  },
  getCity(userId){
  	return "Inconnu";
    // var info = Profiles.findOne({userId: userId});
  	// if(info.address.city){ return info.address.city } 
    //  else { return "Inconnu" }
  },
  actionLabel(userId){
    var owner = Meteor.users.findOne({_id: userId});
    if(owner){ return "Modifier l'offre" }
    else { return "Consulter l'offre" }
  },
  actionRoute(cloth){
    var owner = Meteor.users.findOne({_id: cloth.ownerId});
    if(owner){ return "/edit/" + cloth._id }
    else { return "/viewCloth/" + cloth._id }
  }
});


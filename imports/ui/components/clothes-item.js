import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/images/images.js';
import { Profiles } from '../../api/profiles/profiles.js';
import { Clothes } from '../../api/clothes/clothes.js';
import { Dressings } from '../../api/dressings/dressings.js';

import './clothes-item.html';

Template.Clothes_item.onRendered(function () {
  $(document).ready(function() {
    // Apply ellipsis on cards' titles
    //$(".card-title").dotdotdot({ ellipsis : '...' });
  });
});

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
  	var owner = Profiles.findOne({userId: userId});
    if(owner){ if(owner.userName){ return owner.userName; }}
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
    if(owner){ return cloth._id + "/edit" }
    else { return cloth._id + "/view" }
  },
  getDressingId(userId){
    var dressing = Dressings.findOne({ownerId: userId});
    if(dressing){ return dressing._id; }
  }
});


/**
 * Created by Marc on 20/06/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import './viewCloth.html';

Template.viewCloth.helpers({
	cloth: function(){
        var item = Clothes.findOne({_id: FlowRouter.current().params._id});
        return item;
	},
	getTradName: function(){
		return T9n.get("Cloth Name");
	},
	getTradType: function(){
		return T9n.get("Cloth Type");
	},
	getTradTheme: function(){
		return T9n.get("Cloth Theme");
	},
	getTradColor: function(){
		return T9n.get("Cloth Color");
	},
	getTradGender: function(){
		return T9n.get("Cloth Gender");
	},
	getTradSize: function(){
		return T9n.get("Cloth Size");
	},
	getTradImages: function(){
		return T9n.get("Cloth Images");
	},
	getTradDescr: function(){
		return T9n.get("Cloth Description");
	},
	getClothImage: function(clothId) {
		var item = Images.findOne({_id: clothId});
		return item.url;
	},
	getThumbnail: function(imgUrl) {
		var thumb = Imgur.toThumbnail(imgUrl, Imgur.LARGE_THUMBNAIL);
		return thumb;
	}
});
/*
Template.search.events({

});*/
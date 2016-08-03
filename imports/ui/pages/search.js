/**
 * Created by Marc on 20/06/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import './search.html';

Template.search.helpers({
	cloth: function(){
		//TODO : affiner la recherche
		var allClothes = Clothes.find();
		return allClothes;
	},
	getTradClothes: function(){
		return T9n.get("Available Clothes");
	},
	getClothImage: function(clothId) {
		var item = Images.findOne({_id: clothId});
		return item.url;
	},
	getThumbnail: function(imgUrl) {
		var thumb = Imgur.toThumbnail(imgUrl, Imgur.BIG_SQUARE);
		return thumb;
	}
});
/*
Template.search.events({

});*/
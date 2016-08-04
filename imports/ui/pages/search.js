/**
 * Created by Marc on 20/06/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import { Session } from 'meteor/session';
import './search.html';

Template.search.helpers({
	cloth: function(){
		//TODO : affiner la recherche
		var param = Session.get("searchParam");
		if(param){
			var allClothes = Clothes.find(param);
		}
		else {
			var allClothes = Clothes.find();			
		}
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
	},
	paramSelect: function(){
		var arraySelect = [
			{'selectName': "test1"},
			{'selectName': "test2"},
		];
		return arraySelect;
	},
	paramOption: function(list){
		var arrayOption = {
			'test1': [
				{'optionName': "test11"},
				{'optionName': "test12"},
				{'optionName': "test13"},
				{'optionName': "test14"}
			],
			'test2': [
				{'optionName': "test21"},
				{'optionName': "test22"},
				{'optionName': "test23"},
				{'optionName': "test24"}
			]
		};
		return arrayOption[list];
	}
});
/*
Template.search.events({

});*/
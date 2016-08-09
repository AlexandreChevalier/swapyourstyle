/**
 * Created by Marc on 20/06/2016.
 */
import { Template } from 'meteor/templating';

import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import { Session } from 'meteor/session';
import './search.html';
import '../components/themeMenu.js';
import '../components/categoryMenu.js';
import '../components/sizeMenu.js';

Template.search.onRendered(function searchShowPageOnRendered() {
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
  });
});

Template.search.helpers({
	Clothes() {
		return Clothes.find();
	},
	navItems() {
		return ["categoryMenu", "sizeMenu", "themeMenu"];
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

/*Template.search.events({
	'click .selectOption': function(event, template){
		swal("test");
	}
});*/
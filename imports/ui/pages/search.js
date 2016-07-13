/**
 * Created by Marc on 20/06/2016.
 */
import { Clothes } from '../../api/cloth.js';
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
	getImage: function(){
		return "test.jpg";
	}
});
/*
Template.search.events({

});*/
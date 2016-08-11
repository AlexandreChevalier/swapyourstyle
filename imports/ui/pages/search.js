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
import '../components/genderMenu.js';
import '../components/colorMenu.js';

Template.search.onRendered(function searchShowPageOnRendered() {
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
	Session.set("categoryFilter", "*");
	Session.set("sizeFilter", "*");
	Session.set("themeFilter", "*");
	Session.set("genderFilter", "*");
	Session.set("colorFilter", "*");
  });
});

Template.search.helpers({
	clothes() {
		var categoryFilter = Session.get("categoryFilter");
		var sizeFilter = Session.get("sizeFilter");
		var themeFilter = Session.get("themeFilter");
		var genderFilter = Session.get("genderFilter");
		var colorFilter = Session.get("colorFilter");
		if(categoryFilter === "*"){
			if(sizeFilter === "*"){
				if(themeFilter === "*"){
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find();
						}
						else {
							return Clothes.find({clothColor: colorFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter});
						}
					}
				}
				else {
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothTheme: themeFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothTheme: themeFilter});
						}
					}
				}
			}
			else {
				if(themeFilter === "*"){
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothSize: sizeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothSize: sizeFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothSize: sizeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothSize: sizeFilter});
						}
					}
				}
				else {
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothSize: sizeFilter, clothSize: sizeFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothSize: sizeFilter, clothTheme: themeFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothSize: sizeFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothTheme: themeFilter, clothSize: sizeFilter});
						}
					}
				}
			}
		}
		else {
			if(sizeFilter === "*"){
				if(themeFilter === "*"){
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothType: categoryFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothType: categoryFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothType: categoryFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothType: categoryFilter});
						}
					}
				}
				else {
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothType: categoryFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothType: categoryFilter, clothTheme: themeFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothType: categoryFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothType: categoryFilter, clothTheme: themeFilter});
						}
					}
				}
			}
			else {
				if(themeFilter === "*"){
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothType: categoryFilter, clothSize: sizeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothType: categoryFilter, clothSize: sizeFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothType: categoryFilter, clothSize: sizeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothType: categoryFilter, clothSize: sizeFilter});
						}
					}
				}
				else {
					if(genderFilter === "*"){
						if(colorFilter === "*"){
							return Clothes.find({clothType: categoryFilter, clothSize: sizeFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothType: categoryFilter, clothSize: sizeFilter, clothTheme: themeFilter});
						}
					}
					else {
						if(colorFilter === "*"){
							return Clothes.find({clothGender: genderFilter, clothType: categoryFilter, clothSize: sizeFilter, clothTheme: themeFilter});
						}
						else {
							return Clothes.find({clothColor: colorFilter, clothGender: genderFilter, clothType: categoryFilter, clothTheme: themeFilter, clothSize: sizeFilter});
						}
					}
				}
			}
		}
	},
	navItems() {
		return ["categoryMenu", "genderMenu", "sizeMenu", "themeMenu", "colorMenu"];
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
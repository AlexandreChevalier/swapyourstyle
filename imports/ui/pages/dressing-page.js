/**
 * Created by Marc on 27/04/2016.
 */
import { Template } from 'meteor/templating';

import { Profiles } from '../../api/profiles/profiles.js';
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';

import './dressing-page.html';
import '../components/clothes-item.js';

Template.Dressing_page.helpers({
	userProfile: function() {
		var profile = Profiles.findOne({ userId: Meteor.userId() });
		return profile;
	},
	getClothImage: function(clothId) {
		var item = Images.findOne({_id: clothId});
		return item.url;
	},
	getThumbnail: function(imgUrl) {
		var thumb = Imgur.toThumbnail(imgUrl, Imgur.BIG_SQUARE);
		return thumb;
	},
	clothes() {
		let clothes = Clothes.find(
			{ owner: Meteor.userId() }, 
			{ sort: { createdAt: -1 } }
		);
		if(clothes) { return clothes }
	},
	getDressingName: function(){
		var profile = Profiles.findOne({ userId: Meteor.userId() });
		return profile.dressingName;
	}
});
/**
 * Created by Marc on 27/04/2016.
 */
import { Template } from 'meteor/templating';

import { UserInfos } from '../../api/userInfos/userInfos.js';
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';

import './dressing-page.html';
import '../components/clothes-item.js';

Template.Dressing_page.helpers({
	userProfile: function() {
		var profile = UserInfos.findOne({userId:  Meteor.user()._id});
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
	Clothes() {
		return Clothes.find(
			// Only current user's clothes
			{ userId: Meteor.userId() }, 
			{ sort: { createdAt: -1 } }
		);
	},
	getDressingName: function(){
		var profile = UserInfos.findOne({userId:  Meteor.user()._id});
		return profile.dressingName;
	}
});
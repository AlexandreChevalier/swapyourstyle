/**
 * Created by Marc on 27/04/2016.
 */
import { UserInfos } from '../../api/user/userInfos.js';
import { Clothes } from '../../api/clothes/clothes.js';
import './dressing-page.html';

Template.Dressing_page.helpers({
	userProfile: function() {
		var profile = UserInfos.findOne({userId:  Meteor.user()._id});
		return profile;
	},
    /*getTradNewCloth: function(){
        return T9n.get("New Cloth");
    },
    getTradDressing: function(){
        return T9n.get("Customize Dressing");
    },*/
	cloth: function(){
		//renvoie tous les vetements de l'utilisateur
		var allClothes = Clothes.find({userId: Meteor.user()._id});
		return allClothes;
	}
});
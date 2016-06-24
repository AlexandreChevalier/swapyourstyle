/**
 * Created by Marc on 27/04/2016.
 */
import { userProfile } from '../../api/userProfile.js';
import { Clothes } from '../../api/cloth.js';
import './manageDressing.html';

Template.manageDressing.helpers({
	userProfile: function() {
		var profile = userProfile.findOne({userId:  Meteor.user()._id});
		return profile;
	},
    getTradNewCloth: function(){
        return T9n.get("New Cloth");
    },
    getTradDressing: function(){
        return T9n.get("Customize Dressing");
    },
	cloth: function(){
		//renvoie tous les vetements de l'utilisateur
		var allClothes = Clothes.find({userId: Meteor.user()._id});
		return allClothes;
	}
});

Template.manageDressing.events({
	"click #addClothButton": function () {
        FlowRouter.go("/addCloth");
	},
	"click #showDressingForm": function() {
		var userId = Meteor.userId();
		FlowRouter.go("/updateDressing");
	}
});
/**
 * Created by Marc on 27/04/2016.
 */
import { Dressing } from '../../api/dressing.js';
import { Clothes } from '../../api/cloth.js';
import './manageDressing.html';

Template.manageDressing.helpers({
	dressing: function() {
		var userDressing = Dressing.findOne({userId:  Meteor.user()._id});
		return userDressing;
	},
    getTradNewCloth: function(){
        return T9n.get("New Cloth");
    },
    getTradDressing: function(){
        return T9n.get("Customize Dressing");
    },
	cloth: function(){
		var userDressing = Dressing.findOne({userId:  Meteor.user()._id});
		var allClothes = Clothes.find({dressingId: userDressing._id});
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
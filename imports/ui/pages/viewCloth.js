/**
 * Created by Marc on 20/06/2016.
 */
import { Clothes } from '../../api/cloth.js';
import './viewCloth.html';

Template.viewCloth.helpers({
	cloth: function(){
        var item = Clothes.findOne({_id: FlowRouter.current().params._id});
        console.log("hey : ", item);
        return item;
	},
	getTradName: function(){
		return T9n.get("Cloth Name");
	},
	getTradType: function(){
		return T9n.get("Cloth Type");
	},
	getTradTheme: function(){
		return T9n.get("Cloth Theme");
	},
	getTradColor: function(){
		return T9n.get("Cloth Color");
	},
	getTradGender: function(){
		return T9n.get("Cloth Gender");
	},
	getTradSize: function(){
		return T9n.get("Cloth Size");
	},
	getTradImages: function(){
		return T9n.get("Cloth Images");
	},
	getTradDescr: function(){
		return T9n.get("Cloth Description");
	}
});
/*
Template.search.events({

});*/
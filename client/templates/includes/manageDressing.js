/**
 * Created by Marc on 27/04/2016.
 */
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
		console.log(userDressing);
		return Clothes.find({dressingId: userDressing._id});
	}
})
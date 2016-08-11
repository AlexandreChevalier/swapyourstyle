import { Profiles } from '../../api/profiles/profiles.js';
import './userData.html';

Template.userData.helpers({
	userMail: function(){
		//fonction pour récupérer les mails de l'utilisateur et de les renvoyer en une seule chaine de charactères
		var resultEmail = "";
		if(Meteor.user().emails){
			var emailsLength = Meteor.user().emails.length;
			for(var index = 0 ; index < emailsLength ; index++){
				resultEmail += Meteor.user().emails[index].address;
				// always add ',' except for the last email
				if(index != emailsLength-1){
					resultEmail += ", ";
				}
			}
			return resultEmail;
		}
		else {
			return "Email non renseigné";
		}
	},
	profile: function(){
    	var item = Profiles.findOne({userId: Meteor.user()._id});
		return item;
	},
	getBirthdate: function(){
    	var item = Profiles.findOne({userId:  Meteor.user()._id});
    	if(item){
    		var birthdate = item.birthdate;
    		if(birthdate){
				return birthdate.toLocaleString();
    		}
    	}
	}
});

Template.userData.events({
	"click #showUpdateForm": function () {
        FlowRouter.go("/updateProfile");
	},
	"click #accessDressing": function () {
        FlowRouter.go("/dressing");
	}
});
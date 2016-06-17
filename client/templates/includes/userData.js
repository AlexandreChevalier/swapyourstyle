Template.userData.helpers({
    userProfileExists: function(){
    	var item = userProfile.findOne({userId:  Meteor.user()._id});
        if(item.firstName == null || item.lastName == null){
            return false;
        } else {
            return true;
        }
    },
    user: function () {
    	return Meteor.user();
    },
	userMail: function(){
		var resultEmail = "";
		var emailsLength = Meteor.user().emails.length;
		for(var index = 0 ; index < emailsLength ; index++){
			resultEmail += Meteor.user().emails[index].address;
			// always add ',' except for the last email
			if(index != emailsLength-1){
				resultEmail += ", ";
			}
		}
		return resultEmail;
	},
	userProfile: function(){
    	var item = userProfile.findOne({userId:  Meteor.user()._id});
		return item;
	}
});
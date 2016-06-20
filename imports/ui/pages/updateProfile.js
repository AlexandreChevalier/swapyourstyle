/**
 * Created by Marc on 04/02/2016.
 */
import { userProfile } from '../../api/userProfile.js';
import './updateProfile.html';

Template.updateProfile.helpers({
    selfProf: function(){
        var item = userProfile.findOne({userId: Meteor.userId()});
        return item;
    },
    userProfile: function(){
        return userProfile;
    },
    getUpdateLegend: function(){
        return T9n.get("Updating your profile");
    },
    getSubmit: function(){
        return T9n.get("Submit");
    },
    getReset: function(){
        return T9n.get("Reset");
    }
});

var userProfileHooks = {
    before: {
        update: function(doc){
            return doc;
        }
    },
    onSuccess: function (doc) {
        FlowRouter.go('/');
    }
}
AutoForm.addHooks('updateProfileForm', userProfileHooks);
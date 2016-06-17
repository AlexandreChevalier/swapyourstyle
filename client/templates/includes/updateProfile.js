/**
 * Created by Marc on 04/02/2016.
 */
Template.updateProfile.helpers({
    getUpdateLegend: function(){
        return T9n.get("Updating your profile");
    },
    getSubmit: function(){
        return T9n.get("Submit");
    },
    getReset: function(){
        return T9n.get("Reset");
    },

});
var userProfileHooks = {
    before: {
        update: function(doc){
            return doc;
        }
    },
    onSuccess: function (doc) {
        Router.go('/');
    }
}
AutoForm.addHooks('updateProfileForm', userProfileHooks);
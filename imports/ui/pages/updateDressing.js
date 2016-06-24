/**
 * Created by Marc on 12/06/2016.
 */
import { userProfile } from '../../api/userProfile.js';
import './updateDressing.html';

 Template.updateDressing.helpers({
    selfProfile: function(){
        var item = userProfile.findOne({userId: Meteor.userId()});
        return item;
    },
    userProfile: function(){
        return userProfile;
    },
    getUpdateLegend: function(){
        return T9n.get("Updating infos on Dressing");
    },
    getSubmit: function(){
        return T9n.get("Submit");
    },
    getReset: function(){
        return T9n.get("Reset");
    }
});
var updateDressingHooks = {
    onSuccess: function (doc) {
        FlowRouter.go('/dressing');
    }
}
AutoForm.addHooks('updateDressingForm', updateDressingHooks);
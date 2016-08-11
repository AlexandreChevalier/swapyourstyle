/**
 * Created by Marc on 12/06/2016.
 */
import { Profiles } from '../../api/profiles/profiles.js';
import './updateDressing.html';

 Template.updateDressing.helpers({
    selfProfile: function(){
        var item = Profiles.findOne({userId: Meteor.userId()});
        return item;
    },
    profiles: function(){
        return Profiles;
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
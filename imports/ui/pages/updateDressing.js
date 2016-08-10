/**
 * Created by Marc on 12/06/2016.
 */
import { UserInfos } from '../../api/userInfos/userInfos.js';
import './updateDressing.html';

 Template.updateDressing.helpers({
    selfProfile: function(){
        var item = UserInfos.findOne({userId: Meteor.userId()});
        return item;
    },
    userInfos: function(){
        return UserInfos;
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
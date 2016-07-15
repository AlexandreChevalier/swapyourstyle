/**
 * Created by Marc on 27/04/2016.
 */

import { UserInfos } from '../../api/userInfos/userInfos.js';
import './userInfos-edit-page.html';

Template.userInfos_edit_page.onRendered(function() {
    //needed so the select displays 
    $( document ).ready(function(){
        $('select').material_select();
    });
});

Template.userInfos_edit_page.helpers({
    selfProf: function(){
        var item = UserInfos.findOne({userId: Meteor.userId()});
        console.log(item);
        return item;
    },
    userInfos: function(){
        return UserInfos;
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

var userInfos_edit_pageHooks = {
    onSuccess: function (doc) {
        FlowRouter.go('/');
    }
}
AutoForm.addHooks('updateProfileForm', userInfos_edit_pageHooks);
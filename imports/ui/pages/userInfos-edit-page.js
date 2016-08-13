/**
 * Created by Marc on 27/04/2016.
 */

import { UserInfos } from '../../api/userInfos/userInfos.js';
import './userInfos-edit-page.html';

import { Template } from 'meteor/templating';

Template.userInfos_edit_page.onRendered(function() {
    //needed so the select displays 
    $( document ).ready(function(){
        $('select').material_select();
    });
});

Template.userInfos_edit_page.onCreated(function() {
    //needed so the select displays 
    var infos = UserInfos.findOne({userId: Meteor.userId()});
    if(!infos.address){
        if(Geolocation.currentLocation()){
            var location = Geolocation.currentLocation().coords;
            Meteor.call('getLocation', location.latitude, location.longitude, function(err, response) {
                Session.set('location', response[0]);
            });
            swal({
                title: "Is this your Address ?",
                text: Session.get('location').formattedAddress,
                type: "warning",
                confirmButtonColor: "#00897b",
                confirmButtonText: "Yes",
                showCancelButton: true,
                cancelButtonText: "No",
                closeOnConfirm: false,
                html: false
            }, function(){
                UserInfos.update(infos._id,
                    {$set: {address: {
                        street: Session.get('location').streetNumber + " " + Session.get('location').streetName,
                        postalCode: Session.get('location').zipcode,
                        city: Session.get('location').city,
                        country: Session.get('location').country
                    }}},
                    function(error, result) {
                        if(error){
                            swal("Error !",
                                "Error : " + error.invalidKeys,
                                "error");
                        }
                        else {
                            swal("Updated !",
                                "Your address has been updated",
                                "success");
                        }
                });
            });
        }
    }
});

Template.userInfos_edit_page.helpers({
    selfProf: function(){
        var item = UserInfos.findOne({userId: Meteor.userId()});
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
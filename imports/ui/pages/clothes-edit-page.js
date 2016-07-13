/**
 * Template handler for editing clothes form
 * 
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import './clothes-edit-page.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Clothes_edit_page.onRendered(function() {
    //needed so the select displays 
    $( document ).ready(function(){
        $('select').material_select();
    });
});

Template.Clothes_edit_page.helpers({
    Clothes: function(){
        return Clothes;
    },
    clothProfile: function(){
        var item = Clothes.findOne({_id: FlowRouter.current().params._id});
        return item;
    },
    getUpdateLegend: function(){
        return T9n.get("Updating infos on cloth");
    },
    getTradDressing: function(){
        return T9n.get("Dressing");
    },
    getSubmit: function(){
        return T9n.get("Submit");
    },
    getReset: function(){
        return T9n.get("Reset");
    }
});
var Clothes_edit_pageHooks = {
    onSuccess: function (doc) {
        FlowRouter.go('/dressing');
    }
}
AutoForm.addHooks('updateClothForm', Clothes_edit_pageHooks);
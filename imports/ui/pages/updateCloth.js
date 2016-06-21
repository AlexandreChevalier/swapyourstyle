/**
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/cloth.js';
import './updateCloth.html';

Template.updateCloth.onRendered(function() {
    //needed so the select displays 
    $( document ).ready(function(){
        $('select').material_select();
    });
});

 Template.updateCloth.helpers({
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
var updateClothHooks = {
    onSuccess: function (doc) {
        FlowRouter.go('/dressing');
    }
}
AutoForm.addHooks('updateClothForm', updateClothHooks);
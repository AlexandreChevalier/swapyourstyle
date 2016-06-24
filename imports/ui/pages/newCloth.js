/**
 * Created by Marc on 27/04/2016.
 */
import { userProfile } from '../../api/userProfile.js';
import { Clothes } from '../../api/cloth.js';
import './newCloth.html';


Template.newCloth.onRendered(function() {
    //needed so the select displays 
    $( document ).ready(function(){
        $('select').material_select();
    });
});

Template.newCloth.helpers({
    Clothes: function(){
        return Clothes;
    },
    getUpdateLegend: function(){
        return T9n.get("Adding new cloth");
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
var newClothHooks = {
    before: {
        //A l'ajout d'un nouveau vetement, on le lie a son propriétaire et son dressing
        insert: function(doc){
            var profile = userProfile.findOne({userId:  Meteor.userId()});
            doc.profileId = profile._id;
            doc.userId = Meteor.userId();
            return doc;
        }
    },
    onSuccess: function (doc) {
        FlowRouter.go('/dressing');
    }
}
AutoForm.addHooks('newClothForm', newClothHooks);
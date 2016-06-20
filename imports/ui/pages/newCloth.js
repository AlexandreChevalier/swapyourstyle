/**
 * Created by Marc on 27/04/2016.
 */
import { Dressing } from '../../api/dressing.js';
import { Clothes } from '../../api/cloth.js';
import './newCloth.html';

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
        insert: function(doc){
            var userDressing = Dressing.findOne({userId:  Meteor.userId()});
            doc.dressingId = userDressing._id;
            doc.userId = Meteor.userId();
            return doc;
        }
    },
    onSuccess: function (doc) {
        FlowRouter.go('/dressing');
    }
}
AutoForm.addHooks('newClothForm', newClothHooks);
/**
 * Created by Marc on 12/06/2016.
 */
import { Dressing } from '../../api/dressing.js';
import './updateDressing.html';

 Template.updateDressing.helpers({
    selfDressing: function(){
        var item = Dressing.findOne({userId: Meteor.userId()});
        return item;
    },
    Dressing: function(){
        return Dressing;
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
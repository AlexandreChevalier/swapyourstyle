/**
 * Created by Marc on 12/06/2016.
 */
 Template.updateDressing.helpers({
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
        Router.go('/dressing');
    }
}
AutoForm.addHooks('updateDressingForm', updateDressingHooks);
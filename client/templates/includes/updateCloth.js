/**
 * Created by Marc on 27/04/2016.
 */
 Template.updateCloth.helpers({
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
        Router.go('/dressing');
    }
}
AutoForm.addHooks('updateClothForm', updateClothHooks);
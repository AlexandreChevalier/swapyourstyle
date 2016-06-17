/**
 * Created by Marc on 27/04/2016.
 */
 Template.newCloth.helpers({
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
            var userDressing = Dressing.findOne({userId:  Meteor.user()._id});
            doc.dressingId = userDressing._id;
            return doc;
        }
    },
    onSuccess: function (doc) {
        Router.go('/dressing');
    }
}
AutoForm.addHooks('newClothForm', newClothHooks);
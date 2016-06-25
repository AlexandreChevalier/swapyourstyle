/**
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/cloth.js';
import { Images } from '../../api/image.js';
import './newCloth.html';
//import './upload.js';


Template.newCloth.onRendered(function() {
    //needed so the select displays 
    $( document ).ready(function(){
        $('select').material_select();
    });
});

Template.newCloth.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});

Template.newCloth.helpers({
    Clothes: function(){
        return Clothes;
    },
    currentUpload: function () {
        return Template.instance().currentUpload.get();
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

Template.newCloth.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        //transport: 'http',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('uploaded', function (error, fileObj) {
        if (!error) {
          sweetAlert('File "' + fileObj.name + '" successfully uploaded');
        }
      });

      upload.on('error', function (error, fileObj) {
        sweetAlert("Error !", 'Error during upload', "error");
        console.log(error);
      });

      upload.start();
    }
  }
});

var newClothHooks = {
    before: {
        //A l'ajout d'un nouveau vetement, on le lie a son propriétaire et son dressing
        insert: function(doc){
            doc.userId = Meteor.userId();
            return doc;
        }
    },
    onSuccess: function (doc) {
        FlowRouter.go('/dressing');
    }
}
AutoForm.addHooks('newClothForm', newClothHooks);
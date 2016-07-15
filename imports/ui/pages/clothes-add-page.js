/**
 * Template handler for adding clothes form
 * 
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/image.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './clothes-add-page.html';

// Components used inside the template
// import './app-not-found.js';

Template.Clothes_add_page.onRendered(function clothesShowPageOnRendered() {
  //this.getListId = () => FlowRouter.getParam('_id');
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
  });
});

Template.Clothes_add_page.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});

Template.Clothes_add_page.helpers({
  // accessing our collection
  clothes: function(){
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

Template.Clothes_add_page.events({
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

var Clothes_add_pageHooks = {
  before: {
    // A l'ajout d'un nouveau vetement, 
    // on le lie a son propriétaire et son dressing
    insert: function(doc){
      doc.userId = Meteor.userId();
      console.log("cool : ", doc);
      return doc;
    }
  },
  onSuccess: function (doc) {
    FlowRouter.go('/dressing');
  }
}
AutoForm.addHooks('insertClothForm', Clothes_add_pageHooks);

/**
 * Template handler for adding clothes form
 * 
 * Created by Marc on 27/04/2016.
 */
import { UserInfos } from '../../api/user/userInfos.js';
import { Clothes } from '../../api/clothes/clothes.js';
import './clothes-add-page.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Components used inside the template
// import './app-not-found.js';
Template.Clothes_add_page.onRendered(function clothesShowPageOnCreated() {
  //this.getListId = () => FlowRouter.getParam('_id');
});

Template.Clothes_add_page.onRendered(function clothesShowPageOnRendered() {
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
  });
});

Template.Clothes_add_page.helpers({
  // accessing our collection
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
/*var Clothes_add_pageHooks = {
  before: {
    // A l'ajout d'un nouveau vetement, 
    // on le lie a son propriétaire et son dressing
    insert: function(doc){
      var profile = userInfos.findOne({userId:  Meteor.userId()});
      doc.profileId = profile._id;
      doc.userId = Meteor.userId();
      return doc;
    }
  },
  onSuccess: function (doc) {
    FlowRouter.go('/dressing');
  }
}
AutoForm.addHooks('insertClothForm', Clothes_add_pageHooks);*/

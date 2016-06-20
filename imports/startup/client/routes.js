import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { userProfile } from '../../api/userProfile.js';
import { Clothes } from '../../api/cloth.js';

import '../../ui/components/recupPassword.js';
import '../../ui/components/notFound.html';
import '../../ui/components/loading.html';
import '../../ui/pages/manageDressing.js';
import '../../ui/pages/newCloth.js';
import '../../ui/pages/updateProfile.js';
import '../../ui/pages/updateCloth.js';
import '../../ui/pages/updateDressing.js';
import '../../ui/accueil.js';
import '../../ui/layouts/mainLayout.html';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "accueil"});
  }
});
FlowRouter.route('/resetPassword', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "recupPassword"});
  }
});
FlowRouter.route('/dressing', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "manageDressing"});
  }
});
FlowRouter.route('/addCloth', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "newCloth"});
  }
});
FlowRouter.route('/updateProfile', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "updateProfile"});
  }
});
FlowRouter.route('/updateDressing', {
  action: function(){
    BlazeLayout.render("mainLayout", {content: 'updateDressing'});
  }
});
FlowRouter.route('/updateCloth/:_id', {
  action: function(){
    BlazeLayout.render("mainLayout", {content: 'updateCloth'});
  }
});
/**
 * Template handler for clothes update form
 * 
 * Created by Marc on 27/04/2016.
 */
import { Clothes } from '../../api/clothes/clothes.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Images } from '../../api/images/images.js';

import './clothes-edit-page.html';

Template.Clothes_edit_page.onRendered(function () {
  // Loading material selects
  $( document ).ready(function(){
    $('select').material_select();
  });
});

Template.Clothes_edit_page.onCreated(function () {

});

Template.Clothes_edit_page.helpers({
  clothes: function(){
    return Clothes;
  },
});

Template.Clothes_edit_page.events({

});

var Clothes_edit_pageHooks = {

}

AutoForm.addHooks('updateClothForm', Clothes_edit_pageHooks);
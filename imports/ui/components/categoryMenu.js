/**
 * Created by Marc on 09/08/2016.
 */
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import './categoryMenu.html';

/*Template.categoryMenu.onCreated(function () {
  $( document ).ready(function(){
    // Loading material selects
    $(".dropdown-button btn").dropdown('open');
  });
});*/

Template.categoryMenu.helpers({
  categories() {
    var catArr = Meteor.settings.public.clothType;
    if(catArr[0].value != "*"){
      catArr.unshift({"label": "*", "value": "*"});
    }
    return catArr;
  }
});

/*Template.categoryMenu.events({
  'click .active': function(event, template){
    swal("test");
  }
});*/
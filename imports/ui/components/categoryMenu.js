/**
 * Created by Marc on 09/08/2016.
 */
import { Session } from 'meteor/session';
import './categoryMenu.html';

Template.categoryMenu.helpers({
  categories() {
    var catArr = Meteor.settings.public.clothType;
    if(catArr[0].value != "*"){
      catArr.unshift({"label": "*", "value": "*"});
    }
    return catArr;
  }
});

Template.categoryMenu.events({
  'change #categorySelect': function(event, template){
    Session.set("categoryFilter", $('#categorySelect option:selected').val());
  }
});
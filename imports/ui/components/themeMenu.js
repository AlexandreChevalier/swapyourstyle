/**
 * Created by Marc on 09/08/2016.
 */
import { Session } from 'meteor/session';
import './themeMenu.html';

Template.themeMenu.helpers({
  themes() {
    var themeArr = Meteor.settings.public.clothTheme;
    if(themeArr[0].value != "*"){
      themeArr.unshift({"label": "*", "value": "*"});
    }
    return themeArr;
  }
});

Template.themeMenu.events({
  'change #themeSelect': function(event, template){
    Session.set("themeFilter", $('#themeSelect option:selected').val());
  }
});
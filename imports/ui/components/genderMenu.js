/**
 * Created by Marc on 09/08/2016.
 */
import { Session } from 'meteor/session';
import './genderMenu.html';

Template.genderMenu.helpers({
  genders() {
    var genderArr = Meteor.settings.public.clothGender;
    if(genderArr[0].value != "*"){
      genderArr.unshift({"label": "*", "value": "*"});
    }
    return genderArr;
  }
});

Template.genderMenu.events({
  'change #genderSelect': function(event, template){
    Session.set("genderFilter", $('#genderSelect option:selected').val());
  }
});
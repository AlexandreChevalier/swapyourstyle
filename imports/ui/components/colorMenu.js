/**
 * Created by Marc on 09/08/2016.
 */
import { Session } from 'meteor/session';
import './colorMenu.html';

Template.colorMenu.helpers({
  colors() {
    var colorArr = Meteor.settings.public.clothColor;
    if(colorArr[0].value != "*"){
      colorArr.unshift({"label": "*", "value": "*"});
    }
    return colorArr;
  }
});

Template.colorMenu.events({
  'change #colorSelect': function(event, template){
    Session.set("colorFilter", $('#colorSelect option:selected').val());
  }
});
/**
 * Created by Marc on 09/08/2016.
 */
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
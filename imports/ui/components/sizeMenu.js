/**
 * Created by Marc on 09/08/2016.
 */
import './sizeMenu.html';

Template.sizeMenu.helpers({
  sizes() {
    var sizeArr = Meteor.settings.public.clothSize;
    if(sizeArr[0].value != "*"){
      sizeArr.unshift({"label": "*", "value": "*"});
    }
    return sizeArr;
  }
});
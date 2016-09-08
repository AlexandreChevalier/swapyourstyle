import { Template } from 'meteor/templating';

import { Clothes } from '../../api/clothes/clothes.js';
import { clothes_properties } 
  from '../../../lib/properties/clothes_properties.js';
  var properties = clothes_properties;

import './search-page.html';

Template.Search_page.onRendered(function(){
	Meteor.subscribe('clothes');
	console.log("Subscribing to clothes");
});

Template.Search_page.onRendered(function(){
  $( document ).ready(function(){
    // Loading material selects
    $('select').material_select();
	// Animations
	$('#main')
		.velocity("fadeIn", { duration: 500 })
		.velocity({ opacity: 1 });
  });
});

Template.Search_page.helpers({
  clothes() {
    let clothes = Clothes.find();
    if(clothes) { return clothes }
  }
});

Template.searchBox.helpers({
  clothesIndex() {
    return ClothesIndex;
  }
});
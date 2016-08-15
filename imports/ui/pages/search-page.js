/**
 * Created by Marc on 20/06/2016.
 */
import { Template } from 'meteor/templating';

import { Clothes } from '../../api/clothes/clothes.js';
import { Images } from '../../api/images/images.js';
import { Session } from 'meteor/session';
import './search-page.html';
import '../components/themeMenu.js';
import '../components/categoryMenu.js';
import '../components/sizeMenu.js';
import '../components/genderMenu.js';
import '../components/colorMenu.js';

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

});
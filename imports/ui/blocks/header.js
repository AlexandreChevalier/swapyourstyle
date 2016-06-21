import './header.html';

Template.header.onRendered(function(){
  $( document ).ready(function(){
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
  });
	$(".dropdown-button").dropdown({
    	hover:false
	});
});

Template.header.helpers({

	title(){ return "Swap Your Style" }

});
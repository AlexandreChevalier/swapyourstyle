import './header.html';

Template.header.onRendered(function(){
	$(".dropdown-button").dropdown({
    	hover:false
	});
});

Template.header.helpers({

	title(){ return "Swap Your Style" }

});
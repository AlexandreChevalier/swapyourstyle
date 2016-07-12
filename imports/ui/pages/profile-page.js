import './profile-page.html';

Template.Profile_page.events({
	'click .logout'() {
    	Meteor.logout();
    	// FIXME : not secure
    	FlowRouter.go('home');
    },
});
/**
 * Created by Marc on 02/02/2016.
 */
import './login.html';

Template.login.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});
Template.login.events({
	'submit form': function(event) {
		event.preventDefault();
		var emailVar = event.target.loginEmail.value;
		var passwordVar = event.target.loginPassword.value;
		Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
			if(error){
				Session.set('errorMessage', T9n.get(error.reason));
			} else {
				Router.go("/");
			}
		});
	}
});
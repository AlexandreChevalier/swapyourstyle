/**
 * Created by Marc on 02/02/2016.
 */
import './recupPassword.html';
Template.recupPassword.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});

Template.recupPassword.events({
	"submit .passRecForm": function(event){
		event.preventDefault();
        var options = {};
        options.email = event.target.email.value;
        Accounts.forgotPassword(options, function(error) {
            if(error){
                Session.set('errorMessage', T9n.get(error.reason)); // don't work
            } else {
                sweetAlert(T9n.get("Message sent !"));
                Router.go("/");
            }
        });
	}
});
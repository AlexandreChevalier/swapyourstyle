import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';
if (Meteor.isClient) {
    Template.userData.events({
		"click #showUpdateForm": function () {
			var userId = Meteor.userId();
            Router.go("/updateProfile/" + userId);
		},
		"click #accessDressing": function () {
            Router.go("/dressing");
		}
    });
    Template.manageDressing.events({
		"click #addClothButton": function () {
            Router.go("/addCloth");
		},
		"click #showDressingForm": function() {
			var userId = Meteor.userId();
			Router.go("/updateDressing/" + userId);
		}
    });
	Template.register.events({
		'submit form': function(event) {
			event.preventDefault();
			var emailVar = event.target.registerEmail.value;
			var passwordVar = event.target.registerPassword.value;
			Accounts.createUser({
				email: emailVar,
				password: passwordVar
			});
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
}

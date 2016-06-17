/**
 * Created by Marc on 02/02/2016.
 */
Template.login.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});
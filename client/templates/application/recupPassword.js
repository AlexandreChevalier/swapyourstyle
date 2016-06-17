/**
 * Created by Marc on 02/02/2016.
 */
Template.recupPassword.helpers({
    errorMessage: function() {
        return Session.get('errorMessage');
    }
});
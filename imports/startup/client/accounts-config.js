/**
 * Accounts configuration for the app
 */
// import { Accounts } from 'meteor/accounts-base'; // probably not needed anymore
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { TAPi18n } from 'meteor/tap:i18n';

// TODO : switch to i18n internationalization
T9n.setLanguage('fr');

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  texts: {
    errors: {
      loginForbidden: "Login ou mot de passe incorrect !",//TAPi18n.__('Incorrect username or password'),
      pwdMismatch: "Mots de passe différents !"//TAPi18n.__('Passwords don\'t match'),
    },
    title: {
      signIn: "Connexion",//TAPi18n.__('Sign In'),
      signUp: "Inscription",//TAPi18n.__('Join'),
    },
    inputIcons: {
      isValidating: "fa fa-spinner fa-spin",
      hasSuccess: "fa fa-check",
      hasError: "fa fa-times",
    },
  },
  defaultTemplate: 'Auth_page',
  defaultLayout: 'App_body',
  defaultContentRegion: 'main',
  defaultLayoutRegions: {},
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  {
      _id: 'username_and_email',
      type: 'text',
      required: true,
      displayName: "Login",
  },
  pwd
]);
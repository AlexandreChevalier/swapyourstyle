import '/imports/startup/client';

/**
 * Accounts routing
 */
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});
AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});
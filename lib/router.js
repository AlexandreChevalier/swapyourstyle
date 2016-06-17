Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'accueil'});
Router.route('/resetPassword', {name: 'recupPassword'});
Router.route('/dressing', {name: 'manageDressing'});
Router.route('/addCloth', {name: 'newCloth'});
Router.route('/updateProfile/:_id', function () {
  var item = userProfile.findOne({userId: this.params._id});
  this.render('updateProfile', {data: item});
});
Router.route('/updateCloth/:_id', function () {
  var item = Clothes.findOne({_id: this.params._id});
  this.render('updateCloth', {data: item});
}, {
  name: 'updateCloth.show'
});
Router.route('/updateDressing/:_id', function () {
  var item = Dressing.findOne({userId: this.params._id});
  this.render('updateDressing', {data: item});
});
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.resource('dashboard',function() {
      this.route('list');
      this.route('view',{ path: "/view/:id" });
  });
  this.resource('development', function() {
      this.route('home');
      this.route('dash-list');
  });
  this.resource('widget', function() {});
});

export default Router;

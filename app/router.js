/* global ga */
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType,
    notifyGoogleAnalytics: function () {
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
        });
    }.on('didTransition')
});

Router.map(function () {
    this.resource('canvas', { path: '/canvas' }, function () {
        this.resource('/:canvas_id');
    });
    this.route('statnotices', function () {
        this.route('view', { path: '/:statnotice_id' });
    });
});

export default Router;

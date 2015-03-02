import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('dashboard.header',{ outlet: 'header' });
        this.render({ outlet: 'body' });
    }
});

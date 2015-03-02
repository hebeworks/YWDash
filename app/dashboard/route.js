import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('navigation-view',{ outlet: 'header' });
        this.render({ outlet: 'body' });
    }

});

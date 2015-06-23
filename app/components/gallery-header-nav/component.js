import Ember from 'ember';

export default Ember.Component.extend({
    showSubNav: false,
    didInsertElement: function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            grunticon.embedSVG();
        });
    },
    actions: {
        gotoRoute: function (route) {
            this.sendAction('action', route);
        },
        /*toggleSubNav : function(){
            this.$().addClass('subNav');
            this.set('showSubNav',true);
        }*/
    }
});

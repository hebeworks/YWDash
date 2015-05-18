import Ember from 'ember';

export default Ember.Component.extend({
    svgClass: function(){
        return 'svg-house-price-icon-' + this.get('icon');
    }.property()
});

import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['js-story story'],
    classNameBindings: ['color', 'width', 'height'],
    attributeBindings: ['data-ss-colspan'],
    
    _hideFooter: null,
    hideFooter: Ember.computed("_hideFooter", {
        get: function() {
            return this.get('_hideFooter') != null ? this.get('_hideFooter') :
                        (this.get('viewOnly') === true ? true : false);
        },
        set: function(key, newVal) {
            this.set('_hideFooter', newVal);
            return newVal;
        }
    })
    
});
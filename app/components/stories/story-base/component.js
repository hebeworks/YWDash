import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['story'],
    classNameBindings: ['color', 'width', 'height'],
    attributeBindings: ['data-ss-colspan']
});

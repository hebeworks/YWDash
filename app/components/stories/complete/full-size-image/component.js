/* global Ember, hebeutils, _ */
import DatamillStory from './../../story-types/datamill-story/component';

export default DatamillStory.extend({
    tagName: 'div',
    attributeBindings: ['href', 'style'],
    classNames: 'full-size-image',
    href: null,
    style: null,
    width: '-w1',
    height: '-h1',
    onInit: function(){
        if(this.get('url') != null) {
            this.set('tagName','a');
            this.set('href',this.get('url'));
        }
        if(this.get('image') != null) {
            this.set('style', 'background-image:url(' + this.get('image') + ');');
        }
    }.on('init'),
    didInsertElement: function() {
        var obj = this;
    }
});

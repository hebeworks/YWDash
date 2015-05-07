import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	getStories: function(){
		var obj = this;
		this.store.find('story')
			.then(function (stories) {
                obj.set('stories', stories);
            });
	}.on('init')
});

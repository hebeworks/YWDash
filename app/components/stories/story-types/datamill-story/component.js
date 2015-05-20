import StoryDefault from './../default-story/component';

export default StoryDefault.extend({
	inserted: function () {
		var datamillUrl = this.get('config').dataMillUrl;
		this.set('datamillUrl', datamillUrl.ensureNoEndingString('/'));
	}.on('didInsertElement')
});

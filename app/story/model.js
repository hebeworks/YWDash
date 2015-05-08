import DS from 'ember-data';

var story = DS.Model.extend({
    title: DS.attr('string'),
    storyType: DS.attr('string'),
    configJSON: DS.attr('string'),
    
    _config:null,
    config: function(){
        if(this.get('_config') == null && this.get('configJSON') != null) {
            var json = this.get('configJSON');
            var config = JSON.parse(json);
            this.set('_config', config)
        }
        return this.get('_config');
    }.property()
});

export default story;
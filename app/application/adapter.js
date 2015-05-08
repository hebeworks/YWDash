import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:8080',
    namespace: 'api',
//    pathForType: function (type) {
//        var path = this._super(type);
//        if (path == 'canvas') {
//            path = 'canvases';
//        }
//        return Ember.String.underscore(path);
//    }    
});

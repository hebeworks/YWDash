import ApplicationSerializer from './../application/serializer';

export default ApplicationSerializer.extend({
	extractArray: function(store, type, payload) {
		payload.forEach(function(item){
			item.lat = item.location.coordinates[0];
			item.lng = item.location.coordinates[1];
		})
        return this._super(store, type, payload);
    },
});

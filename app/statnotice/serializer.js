import ApplicationSerializer from './../application/serializer';

export default ApplicationSerializer.extend({
	extractArray: function(store, type, payload) {
		payload.forEach(function(item){
			// mongodb coordinates order is [longitude,latitude]
			item.lng = item.location.coordinates[0];
			item.lat = item.location.coordinates[1];
		})
        return this._super(store, type, payload);
    },
});

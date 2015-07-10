import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',
    extractArray: function(store, type, payload) {
        var payloadTemp = {};
        payloadTemp[type.modelName] = payload;
        return this._super(store, type, payloadTemp);
    },
    extractSingle: function(store, type, payload, id) {
        var payloadTemp = {};
        payloadTemp[type.modelName] = [payload];
        return this._super(store, type, payloadTemp, id);
    }
});

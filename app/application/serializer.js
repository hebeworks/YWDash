import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',
    extractArray: function(store, type, payload) {
        debugger;
        var payloadTemp = {};
        payloadTemp[type.typeKey] = payload;
        return this._super(store, type, payloadTemp);
    },
    extractSingle: function(store, type, payload, id) {
        debugger;
        var payloadTemp = {};
        payloadTemp[type.typeKey] = [payload];
        return this._super(store, type, payloadTemp, id);
    }
});

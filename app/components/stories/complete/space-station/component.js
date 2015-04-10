import Ember from 'ember';


export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    didInsertElement: function() {
        this.set('title', 'House prices in Leeds');
        this.set('subTitle', 'Enquiries dealt with by Leeds Coity Council');
        this.fetchData();
    },
    fetchData: function(date) {
        // reference for object
        // http://landregistry.data.gov.uk/data/hpi/region/leeds/month/2015-01
        Ember.$.getJSON('http://landregistry.data.gov.uk/data/hpi/region/leeds/month/2015-01.json')
        .then((data) => {
            var item = data.result.primaryTopic;
        debugger;
        var resource = {
            annualChange: item.annualChange,
            averageDetached: item.averagePricesDetachedSASM,
            averageFlat: item.averagePricesFlatMaisonetteSASM,
            averageSA: item.averagePricesSA,
            averageSASM: item.averagePricesSASM,
            averageSemi: item.averagePricesSemiDetachedSASM,
            averageTerraced: item.averagePricesTerracedSASM,
            dataSet: item.dataSet,
            indices: item.indices,
            indicesSA: item.indicesSA,
            indicesSASM: item.indicesSASM,
            monthlyChange: item.monthlyChange
        };
        this.set('month', resource);

        setTimeout(() => {
            this.set('loaded', true);
    });
});
}.observes('selectedMonth')
});

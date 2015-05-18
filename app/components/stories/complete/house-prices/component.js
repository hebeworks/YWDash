import Ember from 'ember';


export default Ember.Component.extend({
	tagName: 'div',
	loaded: false,
	selectedMonth: '',
	didInsertElement: function () {
		this.set('title', 'House prices in Leeds');
		this.set('subTitle', 'Enquiries dealt with by Leeds City Council');
		this.fetchData();
	},
	fetchData: function (date) {
		// http://landregistry.data.gov.uk/data/hpi/region/leeds/month/2015-01
		var obj = this;
		var thisMonth = moment().add(-2, 'month').format('YYYY-MM');
		var previousMonth = moment().add(-3, 'month').format('YYYY-MM');

		var currentMonthData = this.getMonthData(thisMonth).then(function (month) {
			obj.set('currentMonth', month);
			setTimeout(() => {
				obj.set('loaded', true);
			});
		});

		var previousMonthData = this.getMonthData(previousMonth).then(function (month) {
			obj.set('previousMonth', month);
		});
    }.observes('selectedMonth'),

	getMonthData: function (date) {
		return Ember.$.getJSON('http://landregistry.data.gov.uk/data/hpi/region/leeds/month/' + date + '.json')
			.then((data) => {
			var item = data.result.primaryTopic;
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
			return resource;
        });
	},

	changeDetached: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageDetached') / this.get('previousMonth.averageDetached')) * 100),2);
	}.property('currentMonth.averageDetached', 'previousMonth.averageDetached'),

	changeFlat: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageFlat') / this.get('previousMonth.averageFlat')) * 100),2);
	}.property('currentMonth.averageFlat', 'previousMonth.averageFlat'),

	changeSemi: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageSemi') / this.get('previousMonth.averageSemi')) * 100),2);
	}.property('currentMonth.averageSemi', 'previousMonth.averageSemi'),

	changeTerraced: function () {
		return hebeutils.evenRound(100 - ((this.get('currentMonth.averageTerraced') / this.get('previousMonth.averageTerraced')) * 100),2);
	}.property('currentMonth.averageTerraced', 'previousMonth.averageTerraced')
});

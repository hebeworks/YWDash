import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    didInsertElement: function() {
        this.set('title', 'Leeds Inspired');
        this.fetchData();
    },
    fetchData: function() {
        Ember.$.ajax({
            url: 'http://api.leedsinspired.co.uk/1.0/events.json?key=ssHoTt9L696e8F84IOH2o4n52n89nxX78pq1dLs4uOkc7&start_date=' + moment().format('DD-MM-YYYY') + '&end_date=' + moment().add(1, 'week').format('DD-MM-YYYY') + '&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            contentType: 'application/json'
        }).then(function(data) {
            console.log(data);
        });
    }
});

import Ember from 'ember';

export default Ember.Component.extend({
    svgClass: function () {
        return 'svg-house-price-icon-' + this.get('icon');
    }.property(),

    chartDataChanged: function () {
        var chartData = this.get('chartData');

        var xAxis = ['x'];
        var values = ['leeds'];

        for (var i = 0; i < chartData.length; i++) {
            var item = chartData[i];
            xAxis.push(item.date);
            values.push(item.value);
        }

        this.set('graphParams',
            {
                data: {
                    columns: [
                        xAxis,
                        values,
                        // ['leeds', 190, 193, 192, 195, 196, 199, 198, 200],
                        ['national', 210, 210, 210, 210, 210, 210, 210, 210],
                        // ['x', '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01']
                    ],
                    x: 'x',
                    type: 'line',
                    colors: {
                        leeds: '#7ED321',
                        national: '#2980B9'
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m'
                        }
                    },
                    y: {
                        tick: {
                            count: 5
                        }
                    }
                }
            });

        debugger;
    }.observes('chartData'),

    graphParams: null,
});
import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['story__chart-wrapper'],
    didInsertElement: function() {
        console.log("testing");
        var chart = c3.generate({
            bindto: '#' + this.elementId + '>.story__chart',
            legend: {
                show: false
            },
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.7 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            grid: {
                x: {
                    show: false
                },
                y: {
                    show: true
                }
            }
        });

        // Generate our custom legend

        d3.select('#' + this.elementId).insert('div', '.story__chart').attr('class', 'legend').selectAll('span')
            .data(['data1', 'data2'])
            .enter().append('span')
            .attr('data-id', function (id) { return id; })
            .html(function (id) { return id; })
            .each(function (id) {
                d3.select(this).style('background-color', chart.color(id));
            })
            .on('mouseover', function (id) {
                chart.focus(id);
            })
            .on('mouseout', function (id) {
                chart.revert();
            })
            .on('click', function (id) {
                chart.toggle(id);
            });
    }
});

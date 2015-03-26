import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: 'story__chart-wrapper',
    renderChart: function() {

        var data = [
            {
                x:   '1',
                y: 4
            },
            {
                x:   '10',
                y: 13
            },
            {
                x:   '15',
                y: 40
            },
            {
                x:   '2',
                y: 20
            }, {
                x:   '25',
                y: 19
            },
            {
                x:   '30',
                y: 44
            }, {
                x:   '36',
                y: 57
            },
            {
                x:   '100',
                y: 37
            }
        ];

        var $el = Ember.$(this.get('element'));

        var fullWidth = $el.innerWidth();
        var fullHeight = $el.innerHeight();

        var margin = {top: 10, right: 15, bottom: 15, left: 20},
            width = fullWidth - margin.left - margin.right,
            height = fullHeight - margin.top - margin.bottom;

        // Set our scales up for the axes - rangeRoundBands prevents pixellation difficulties http://bost.ocks.org/mike/bar/3/
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(1);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickSize(1);

        // Create our chart element - it needs to be larger than the size of our data domain by the widths / heights of our margins, to allow for the axes.
        var chart = d3.select(".js-bar-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set our domains - this is the span of ys covered by each axis.
        y.domain([0, d3.max(data.map((d) => {return d.y;}))]);
        x.domain(data.map(function (d) {
            return d.x;
        }));

        chart.append("g")
            .attr("class", "x axis")
            .attr("height", 1)
            .attr("transform", "translate(0," + (height - 1) + ")")
            .call(xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .attr("width", 1)
            .call(yAxis);

        chart.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y);
            })
            .attr("height", function (d) {
                return height - y(d.y) - 1;
            })
            .attr("width", x.rangeBand());
    },
    didInsertElement: function() {
        this.renderChart();
    }
});



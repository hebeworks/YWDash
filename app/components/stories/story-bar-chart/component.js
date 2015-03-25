import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: 'story__chart-wrapper',
    renderChart: function() {

        var data = [4, 8, 15, 16, 23, 42];
        var $el = Ember.$(this.get('element'));
        if (!$el.length) {
            console.log('Missing .js-bar-chart element');
            return;
        }

        var width = $el.innerWidth();
        var height = $el.innerHeight();

        var y = d3.scale.linear()
            .range([height, 0]);

        var chart = d3.select(".js-bar-chart")
            .attr("width", width)
            .attr("height", height);

        y.domain([0, d3.max(data)]);

        var barWidth = width / data.length;

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

        bar.append("rect")
            .attr("y", function(d) { return y(d); })
            .attr("height", function(d) { return height - y(d); })
            .attr("width", barWidth - 1);

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", function(d) { return y(d) + 3; })
            .attr("dy", ".75em")
            .text(function(d) { return d; });

    },
    didInsertElement: function() {
        this.renderChart();
    }
});



import Ember from 'ember';

export default Ember.Component.extend({
    title: 'Testing Line Component',
    subTitle: 'Line chart',
    data : [{
        x: 'Jan',
        y: 5
    }, {
        x: 'Feb',
        y: 20
    }, {
        x: 'Mar',
        y: 10
    }, {
        x: 'Apr',
        y: 40
    }, {
        x: 'May',
        y: 5
    }, {
        x: 'Jun',
        y: 60
    }]
});

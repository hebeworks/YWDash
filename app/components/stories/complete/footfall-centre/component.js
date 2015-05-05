import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    selectedDay: '',

    didInsertElement: function () {
        this.set('title', 'City Centre Footfall');
        this.set('subTitle', 'Daily snapshot of footfall in the city');
        this.fetchData();
    },

    fetchData: function () {
        // request ckan api for dataset
        var obj = this;
        Ember.$.getJSON('http://www.leedsdatamill.org/api/3/action/package_show?id=leeds-city-centre-footfall-data')
            .then(function (data) {
            var resources = [];
            data.result.resources.forEach(function (item) {
                // format API data here
                var resource = {};
                resource.text = item["name"];
                resource.id = item["id"];
                resource.date = item["temporal_coverage_to"];
                resources.push(resource);
            });

            _.sortBy(resources, function (month) {
                return month.date;
            });

            resources.reverse();

            obj.set('months', resources);
            obj.set('selectedMonth', obj.get('months')[0]);

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    },

    fetchMonth: function (resourceID) {
        var obj = this;
        var data = {
            sql: 'SELECT * from "' + this.get('selectedMonth.id') + '"'
        }

        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search_sql?', data).then(function (data) {
            var items = [];
            data.result.records.forEach(function (item) {
                var day = moment(item.Weekday).calendar();
                var date = moment(item.Date).calendar();
                var result = {
                    date: date,
                    total: item.TotalCount,
                    hour: item.Hour,
                    title: item.Sitename,
                    day: day,
                    location: item.LocationName
                };
                items.push(result);
            });

            var days = obj.getDays(items);

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    }.observes('selectedMonth'),

    getDays: function (items) {
        var sortedDays = _.sortBy(items, "hour");
        var days = _.groupBy(sortedDays, "date");
        for (var day in days) {
            var location = _.groupBy(days[day], 'location');
            days[day] = this.convertToArrayWithTotal(location);
        }
        var tmpDays = this.convertToArrayWithTotal(days);

        this.set('days', tmpDays);

        // set the default day to display
        var firstDay = this.get('days.items')[0];
        if (firstDay != null) {
            this.set('selectedDay', firstDay);
        }
    },

    convertToArrayWithTotal: function (items) {
        var tmp = {
            items: []
        };

        for (var item in items) {
            var tmpItem = items[item];
            var itemTotal = this.getTotal(tmpItem);
            tmpItem.title = item;
            tmpItem.total = itemTotal;
            tmp.items.push(tmpItem)
        }

        var total = this.getTotal(tmp.items);
        tmp.total = total;
        var id = hebeutils.guid();
        tmp.id = id;
        return tmp;
    },

    getTotal: function (items) {
        var sum = _.reduce(items, function (memo, item) {
            if (item.total != null && parseFloat(item.total)) {
                return memo + parseFloat(item.total);
            } else {
                return memo;
            }
        }, 0);
        return sum;
    }
});

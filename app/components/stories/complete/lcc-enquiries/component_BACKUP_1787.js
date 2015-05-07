import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    didInsertElement: function () {
        this.set('title', 'LCC Contact Centre Enquiries');
        this.set('subTitle', 'Enquiries dealt with by Leeds City Council');
        this.fetchData();
    },
    fetchData: function () {
        // request ckan api for dataset
        var obj = this;
        Ember.$.getJSON('http://www.leedsdatamill.org/api/3/action/package_show?id=customer-services-contact-enquiries')
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

<<<<<<< HEAD
                resources.reverse();

                obj.set('months', resources);
                obj.set('selectedMonth',obj.get('months')[0]);
=======
            obj.set('months', resources);
            obj.set('selectedMonth', obj.get('months')[0]);
>>>>>>> 3db308e92fb6b9496dacff5351dc9e7200f3ccc7

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    },

    fetchMonth: function (resourceID) {
        var obj = this;
        var data = {
<<<<<<< HEAD
            sql: 'SELECT * from "'+this.get('selectedMonth.id')+'"'
        }

        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search_sql?',data).then(function(data) {
            
            var items = []; 
            data.result.records.forEach(function(item) {
=======
            sql: 'SELECT * from "' + this.get('selectedMonth.id') + '"'
        }

        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search_sql?', data).then(function (data) {
            var items = [];
            data.result.records.forEach(function (item) {
>>>>>>> 3db308e92fb6b9496dacff5351dc9e7200f3ccc7
                // format API data here
                var result = {};
                result.location = item["Created at location"];
                result.service = item["Service"];
                result.postcode = item["Postcode trunc"];
                result.enquiry = item["Enquiry Type"];
                result.total = (item["Total"] != null ?
                    item["Total"] :
                    (item["Total contact"] != null ?
                        item["Total contact"] : 0));
                items.push(result);
            });
<<<<<<< HEAD

            obj.set('topPostcodes',obj.getTopByProperty(items,'postcode',3));        
            obj.set('topEnquiries',obj.getTopByProperty(items,'enquiry',3));        
            obj.set('topServices',obj.getTopByProperty(items,'service',3));        
=======
>>>>>>> 3db308e92fb6b9496dacff5351dc9e7200f3ccc7

            var allItemTotals = obj.getTotal(items, 'total');
            obj.set('totalEnquiries', allItemTotals);
            obj.set('topPostcodes', obj.getTopByProperty(items, 'postcode', 3));
            obj.set('topEnquiries', obj.getTopByProperty(items, 'enquiry', 3));
            obj.set('topServices', obj.getTopByProperty(items, 'service', 3));

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    }.observes('selectedMonth'),

<<<<<<< HEAD
    getTopByProperty: function(items, property,count) {
        var itemTotals = _.groupBy(items,property);
        itemTotals = _.map(itemTotals, function(element){ 
            var sum = _.reduce(element, function(memo, item){ 
                if(item.total != null && parseFloat(item.total)){
                    return memo + parseFloat(item.total); 
                } else {
                    return memo;
                }
            }, 0);
            var result = {
                total: sum
=======
    getTopByProperty: function (items, property, count) {
        var obj = this;
        var totalEnquiries = obj.get('totalEnquiries');
        var itemTotals = _.groupBy(items, property);
        itemTotals = _.map(itemTotals, function (element) {
            var sum = obj.getTotal(element, 'total');
            var percentage = ((sum / totalEnquiries) * 100).toPrecisionDigits(1);
           // console.log('totalEnquiries: ' + totalEnquiries + ',total: ' + sum + ', %: ' + percentage);
            var result = {
                total: sum,
                percentage: percentage
>>>>>>> 3db308e92fb6b9496dacff5351dc9e7200f3ccc7
            };
            result[property] = _.first(element)[property];
            return result;
        });
<<<<<<< HEAD
        itemTotals = _.sortBy(itemTotals,'total').reverse();
        return itemTotals.slice(0,count);
=======
        itemTotals = _.sortBy(itemTotals, 'total').reverse();

        return itemTotals.slice(0, count);
    },

    getTotal: function (items, prop) {
        var sum = _.reduce(items, function (memo, item) {
            if (item[prop] != null && parseFloat(item[prop])) {
                return memo + parseFloat(item[prop]);
            } else {
                return memo;
            }
        }, 0);
        return sum;
>>>>>>> 3db308e92fb6b9496dacff5351dc9e7200f3ccc7
    },

    stripHTML: function (html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});

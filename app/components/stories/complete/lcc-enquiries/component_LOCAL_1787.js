import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    selectedMonth: '',
    didInsertElement: function() {
        this.set('title', 'LCC Contact Centre Enquiries');
        this.set('subTitle', 'Enquiries dealt with by Leeds City Council');
        this.fetchData();
    },
    fetchData: function() {
        // request ckan api for dataset
        var obj = this;
        Ember.$.getJSON('http://www.leedsdatamill.org/api/3/action/package_show?id=customer-services-contact-enquiries')
            .then(function(data){
                var resources = []; 
                data.result.resources.forEach(function(item) {
                    // format API data here
                    var resource = {};
                    resource.text = item["name"]; 
                    resource.id = item["id"];
                    resource.date = item["temporal_coverage_to"];
                    resources.push(resource);
                });

                _.sortBy(resources,function(month){
                    return month.date;
                });

                resources.reverse();

                obj.set('months', resources);
                obj.set('selectedMonth',obj.get('months')[0]);

                setTimeout(function() {
                    obj.set('loaded', true);
                });
            });
    },

    fetchMonth: function(resourceID){
        var obj = this;
        var data = {
            sql: 'SELECT * from "'+this.get('selectedMonth.id')+'"'
        }

        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search_sql?',data).then(function(data) {
            
            var items = []; 
            data.result.records.forEach(function(item) {
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

            obj.set('topPostcodes',obj.getTopByProperty(items,'postcode',3));        
            obj.set('topEnquiries',obj.getTopByProperty(items,'enquiry',3));        
            obj.set('topServices',obj.getTopByProperty(items,'service',3));        

            setTimeout(function() {
                obj.set('loaded', true);
            });
        });
    }.observes('selectedMonth'),

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
            };
            result[property] = _.first(element)[property];
            return result;
        });
        itemTotals = _.sortBy(itemTotals,'total').reverse();
        return itemTotals.slice(0,count);
    },

    stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});

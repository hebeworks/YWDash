import Ember from 'ember';


export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'LCC Contact Centre Enquiries');
        this.set('subTitle', 'Contact enquiries made to LCC.');
        this.fetchData();
    },
    fetchData: function() {
        var data = {
            sql: 'SELECT * from "ccf2aa21-2646-4bee-9c6b-771d10718922"'// WHERE title LIKE ' + "'jones'"
        }

        Ember.$.getJSON('http://www.leedsdatamill.org/api/action/datastore_search_sql?',data).then((data) => {
            var items = []; 
            data.result.records.forEach((item) => {
                // format API data here
                var result = {};
                result.location = item["Created at location"]; 
                result.service = item["Service"];
                result.postcode = item["Postcode trunc"];
                result.enquiry = item["Enquiry Type"];
                result.total = item["Total"];
                items.push(result);
            });

            this.set('topPostcodes',this.getTopByProperty(items,'postcode',3));        
            this.set('topEnquiries',this.getTopByProperty(items,'enquiry',3));        
            this.set('topServices',this.getTopByProperty(items,'service',3));        

            setTimeout(() => {
                this.set('loaded', true);
            });
        });
},

getTopByProperty: function(items, property,count) {
    var itemTotals = _.groupBy(items,property);
    itemTotals = _.map(itemTotals, function(element){ 
        var sum = _.reduce(element, function(memo, item){ return memo + parseFloat(item.total); }, 0);
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

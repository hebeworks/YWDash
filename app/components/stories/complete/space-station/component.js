import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    loaded: false,
    didInsertElement: function() {
        this.set('title', 'Space watch');
        this.set('subTitle', 'ISS over Leeds');
        this.fetchData();
    },
    fetchData: function() {
        var obj = this;
        Ember.$.ajax({
            url:'http://api.open-notify.org/iss-pass.json?lat=53.7997&lon=1.5492',
            dataType: "jsonp",
            success: function(data){
                var passes = [];
                data.response.forEach((item) => {
                    // format API data here
                    var pass = {};
                    pass.duration = moment.duration(item.duration, 'seconds').asMinutes();
                    pass.date = moment(item.risetime,'X').fromNow();
                    passes.push(pass);
                });
                obj.set('items', passes);
                setTimeout(() => {
                    obj.set('loaded', true);
                });
            }
        });
    },
    stripHTML: function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }
});

import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    loaded: false,
    didInsertElement: function () {
        this.set('title', 'Leeds Inspired');
        this.fetchData();
    },




    //
    //categories: Array[2]
    //0: Object
    //category_id: "11"
    //category_title: "Workshop"
    //__proto__: Object
    //1: Object
    //length: 2
    //__proto__: Array[0]
    //dates: Array[10]
    //0: Object
    //1: Object
    //2: Object
    //end_date: "2014-12-01 16:00:00"
    //start_date: "2014-12-01 10:00:00"
    //__proto__: Object
    //3: Object
    //4: Object
    //5: Object
    //6: Object
    //7: Object
    //8: Object
    //9: Object
    //length: 10
    //__proto__: Array[0]
    //description: "Ever fancied being a life-model? Already a model and want to meet others in the profession? Enjoy mixed arts, performance, discussion and pose-shaping? Want to look at and talk about works in the Gallery's collections? Interested in working from the body and exploring gender and creative expression in a group? Want to model solo, in pairs or in groups for a life-drawing session? If the answer is 'yes' to any of the above, then Saturday Moots is the workshop programme for you.↵↵Saturday Moots is a programme of model-only day workshops. It invites life-models or anyone interested in body art to explore life-model creative practice. The workshop will be model-led and offers opportunity to explore nude-working, drape, costume, and posing. All activities are optional and models will encouraged to develop their own code of 'robe use'. The workshops involve discussion about life-modelling and life-drawing, mixed arts, storytelling and pose-building. All models attending the day-workshop will be invited to attend the Sunday Club on the following day to pose for life-drawers at a model-led life-drawing session should they wish to. Any model attending either or both sessions will be invited to add their name and contact details to our life-model pool if they want to seek work in the local life-drawing community. ↵↵Sessions are alternate female and male, meeting every other month. We welcome any individual's self-definition of their gender.↵↵Sessions are free-of-charge- materials provided. Please bring your own robe (eg. dressing gown, wrap, track suit) if wishing to explore nude-working.↵↵Workshops are for adults: 18+↵↵Saturday Moots run on the following Saturdays at the Education Studio, Leeds Art Gallery, 10am-4pm, in 2014-2015:↵↵November 22nd - male↵December 13th - female↵January 24th - male↵February 21st - female↵March 21st - male↵April 18th - female↵May 23rd - male↵June 20th - female↵July 18th - male↵↵Saturday Moots / Sunday Club is a life-modelling start-up project aimed at extending the very noble and fascinating practice of life-modelling and life-drawing. It offers space for conversation between models, for creative development and expression through the body, and for professional networking to happen between life-models and life-drawers in the local area.↵↵We thank Leeds Art Gallery Education for their support of this project."
    //event_date: "25 Oct 2014 - 18 Jul 2015"
    //event_id: "14441"
    //event_title: "Saturday Moots"
    //image_original: "http://www.leedsinspired.co.uk/sites/default/files/images/events/14441.jpg"
    //image_thumbnail: "http://www.leedsinspired.co.uk/sites/default/files/styles/190x190/public/images/events/14441.jpg"
    //organiser_id: "5741"
    //organiser_title: "Cast-Off Drama"
    //place_id: "150"
    //place_title: "Leeds Art Gallery"
    
    
    fetchData: function () {
        // request ckan api for dataset
        var obj = this;
        var fromDate = moment().add(-7,'days').format('DD-MM-YYYY');
        var toDate = moment().add(7,'days').format('DD-MM-YYYY');
        var url = "http://api.leedsinspired.co.uk/1.0/events.json?key=ssHoTt9L696e8F84IOH2o4n52n89nxX78pq1dLs4uOkc7&start_date="+fromDate+"&end_date="+toDate;
        console.log(url);
        url = btoa(url);

        Ember.$.ajax({
            url: 'http://hebenodeapi.azurewebsites.net/apiproxy?url=' + url,
            type: 'GET',
            crossOrigin: true
        })
            .then(function (data) {
            var events = [];
            var items = [];
            
            var events = data.objects;
            events = _.filter(events, function(event) {
                return event.event_title.notNullOrEmpty()
                        && event.event_date.notNullOrEmpty()
                        && (event.image_thumbnail.notNullOrEmpty() || event.thumbnail.notNullOrEmpty());
            });
            
            //_.first(data.objects,5)
            var events = _.sample(events,5);
            
            events.forEach(function (item) {
                var thumbnail = (item.image_thumbnail.notNullOrEmpty() ? item.image_thumbnail : item.thumbnail);
                var event = {
                    id: item.event_id,
                    title: item.event_title,
                    thumbnail: thumbnail,
                    date: item.event_date,
                    place: item.place_title,
                    description: item.description
                };

                items.push(event);
            });

            obj.set('items', items);

            setTimeout(function () {
                obj.set('loaded', true);
            });
        });
    }
});

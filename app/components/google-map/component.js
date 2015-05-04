import Ember from 'ember';

export default Ember.Component.extend({
	setup: function () {
		// set default leeds init location if none set
		if (this.get('initLat') == null) {
			this.set('initLat', 53.801277);
		}
		if (this.get('initLng') == null) {
			this.set('initLng', -1.548567);
		}
	}.on('init'),

	didInsertElement: function () {
		this.loadScript();
	},

	initMap: function () {
		var obj = this;
		if (typeof google !== 'undefined') {
			if (obj.get('googleTimer') != null) {
				clearInterval(obj.get('googleTimer'));
				obj.set('googleTimer', null);
			}
			obj.setupMap();
		} else {
			// keep checking if google has been init
			obj.set('googleTimer', setInterval(function () { obj.initMap(); }, 500));
		}
	},

	loadScript: function () {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = '//maps.googleapis.com/maps/api/js?v=3.exp' +
		'&signed_in=true';
		document.body.appendChild(script);
		this.initMap();
	},

	setupMap: function () {
		var obj = this;
		console.log('init map');
		if (typeof google !== 'undefined' &&
			typeof google.maps.LatLng !== 'undefined') {
			if (this.get('googleTimer') != null) {
				clearInterval(this.get('googleTimer'));
				this.set('googleTimer', null);
			}
			debugger;
			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(this.get('initLat'), this.get('initLng'))
			};

			var el = this.$();
			var map = new google.maps.Map(document.getElementById('map-canvas'),
				mapOptions);
			obj.set('map', map);
		} else {
			// keep checking if google has been init
			obj.set('googleTimer', setInterval(function () { obj.initMap(); }, 500));
		}
	}
});

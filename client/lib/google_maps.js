gmaps = {
    // map object
    map: null,

    // google markers objects
    markers: [],

    // google lat lng objects
    latLngs: [],

    // our formatted marker data objects
    markerData: [],

    routes: [],

    directionsDisplay: null,

    directionsService: null,

     // add a marker given our formatted marker data object
     addMarker: function(marker) {
        var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
        var gMarker = new google.maps.Marker({
            position: gLatLng,
            map: this.map,
            title: marker.title,
            animation: google.maps.Animation.DROP,
            icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        this.latLngs.push(gLatLng);
        this.markers.push(gMarker);
        this.markerData.push(marker);
        return gMarker;
    },

     // calculate and move the bound box based on our markers
     calcBounds: function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
            bounds.extend(this.latLngs[i]);
        }
        this.map.fitBounds(bounds);
    },
    // check if a marker already exists
    markerExists: function(key, val) {
        _.each(this.markers, function(storedMarker) {
            if (storedMarker[key] == val)
                return true;
        });
        return false;
    },

    // initialize the map
    initialize: function() {
        console.log("[+] Intializing Google Maps...");
        var rendererOptions = {
            map: this.map,
            draggable: true
        };
        this.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        this.directionsService = new google.maps.DirectionsService();
        console.log(this.directionsDisplay);
        console.log(this.directionsService);

        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(-19.8921628,-44.0823099),
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

        this.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            mapOptions
            );
        this.directionsDisplay.setMap(this.map);


        // global flag saying we intialized already
        Session.set('map', true);
    },
    

}
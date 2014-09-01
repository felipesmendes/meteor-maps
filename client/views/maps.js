Template.home.events({
    "click #rota" : function(e,template){
        calcRoute(template.find("#ponto1").value,template.find("#ponto2").value);
    }
});
Template.map.rendered = function() {
    if (! Session.get('map')){
        gmaps.initialize();
    }
    Deps.autorun(function() {
                var markers = Vans.find().fetch();
         
                _.each(markers, function(page) {                 
                            var objMarker = {
                                    lat: page.lat,
                                    lng: page.lng,
                            };
                gmaps.addMarker(objMarker);
                    });
        var mc = new MarkerClusterer(gmaps.map,gmaps.markers);

            });

    google.maps.event.addListener(gmaps.map, 'click', function(event) {
        var marker = {lat:event.latLng.lat(),lng:event.latLng.lng()};
        Vans.insert(marker);
    });

};
Template.map.destroyed = function() {
    Session.set('map', false);
};
function calcRoute(start,end){       
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
      gmaps.directionsService.route(request, function(response, status) {

    if (status == google.maps.DirectionsStatus.OK) {
            gmaps.directionsDisplay.setDirections(response);
        }
    });
}
$(document).ready(function (){

  // create a LatLng object containing the coordinate for the center of the map
  var latlng = new google.maps.LatLng(41.876949, -87.624352);

  // prepare the map properties
  var options = {
    zoom: 13,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

  //add Event Markers
  var eventMarkers = [];
  $.ajax({
    url:"http://api.meetup.com/events?radius=25.0&order=time&group_urlname=chicagoyoungmen&offset=0&photo-host=public&format=json&page=20&fields=&sig_id=125028852&sig=f392277c2b492128ea2e8d686a3b5647fc648e87",
    type:'GET',
    dataType:'JSONP',
    success: function(response){

      for(i=0; i<response.results.length; i++){
        eventMarkers[i] = new google.maps.Marker({
          position: new google.maps.LatLng(response.results[i].venue_lat, response.results[i].venue_lon),
          map: map

      })

      //add event info window
            var name = response.results[i].name;
            var venue_name = response.results[i].venue_name;
            var address1 = response.results[i].venue_address1;
            var event_url = response.results[i].event_url;
            var description = response.results[i].description;
            var message = '<div id="content"><b>'+name+'</b>'+
              '<p>Where: '+venue_name+'<br>'+
              'Address: '+address1+'<br>'+
              '<a href="'+event_url+'" target="_blank">More Info</a></br>'+
              description+'</p></div>'
        addInfoWindow(eventMarkers[i], message);
    }
  }
  });

  function addInfoWindow(marker, message) {

    var infoWindow = new google.maps.InfoWindow({
      content: message,
      maxWidth: 600
    });

    google.maps.event.addListener(marker, 'click', function () {
    infoWindow.open(map, marker);
  });
  }
});
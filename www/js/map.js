var geocoder;
var map;
var idIndex;
var isDetail;
var zoomSize;
var delay = 100;
var jsonIndex;

function loadMapScript(index, mapType) {
   idIndex = index;
   isDetail = mapType;
   jsonIndex = 0;
   var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialize";
   document.body.appendChild(script);
}

function initialize() {
   if(isDetail == false)
      zoomSize = 8;
   else
      zoomSize = 13;

   geocoder = new google.maps.Geocoder();
   var myLatlng = new google.maps.LatLng(28.204666, -15.793506);
   var mapProp = {
      center: myLatlng,
      zoom: zoomSize,
   };
   map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

   xmlhttp = new XMLHttpRequest();
   if(isDetail == false)
      xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services_addresses/", true);
   else 
      xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_service/" + idIndex, true);
   xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4) {
         var jsonResponse = JSON.parse(xmlhttp.responseText);
         if(isDetail == false) {
            while(jsonIndex < jsonResponse.length) {
               setTimeout(codeAddress(jsonResponse[jsonIndex]), delay);
               jsonIndex++;
            }
         } else {
            codeAddress(jsonResponse);
         }
      }
   }
   xmlhttp.send(null);
}

function codeAddress(json) {
   var address = json.address + ", " + json.postal_code + ", " 
      + json.town + ", " + json.province;

   geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         if(isDetail == true)
            map.setCenter(results[0].geometry.location);
         addMarker(results[0].geometry.location, json);
      } else {
         if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            jsonIndex--;
            delay++;
         }
      }
   });
};

function addMarker(pos, json) {
   var marker = new google.maps.Marker({
      map: map,
      position: pos,
      icon: '../www/img/marker.png'
   });

   var data = '<span class="glyphicon glyphicon-home"></span> <strong>' + json.name + '</strong><br/>' + json.address 
      + '<br/><span><img src="../www/img/letter.png" width="13px" height="13px" align="center" /></span> ' + json.postal_code
      + '<br/><span><img src="../www/img/phone.png" width="13px" height="13px" align="center" /></span> ' + json.phone;

   var infowindow;
   if(isDetail == false) {
      infowindow = new google.maps.InfoWindow({ 
         content: data
      });
   } else {
      infowindow = new google.maps.InfoWindow({ 
         content: data + '<p><div id="content" style="width:290px; height:200px;"></div></p>'
      });

      var pano = null;
      google.maps.event.addListener(infowindow, 'domready', function () {
         if (pano != null) {
            pano.unbind("position");
            pano.setVisible(false);
         }
         pano = new google.maps.StreetViewPanorama(document.getElementById("content"), {
            navigationControl: true,
            navigationControlOptions: { style: google.maps.NavigationControlStyle.ANDROID },
            enableCloseButton: false,
            addressControl: false,
            linksControl: false
         });
         pano.bindTo("position", marker);
         pano.setVisible(true);
      });

      google.maps.event.addListener(infowindow, 'closeclick', function () {
         pano.unbind("position");
         pano.setVisible(false);
         pano = null;
      });

      infowindow.open(map, marker);
   }
   $('#content-loader').hide();
   $('#loader').hide();

   google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
   });
}
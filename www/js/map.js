var geocoder;
var map;
var itemIndex;
var isDetail;
var zoomSize;

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
      xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_service/" + itemIndex, true);
   xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4) {
         var jsonResponse = JSON.parse(xmlhttp.responseText);
         if(isDetail == false) {
            for(i = 0; i < jsonResponse.length; i++) {
               var jsonString = jsonResponse[i].address + ", " + jsonResponse[i].postal_code + ", " 
                  + jsonResponse[i].town + ", " + jsonResponse[i].province;
               codeAddress(jsonString, jsonResponse[i].name, jsonResponse[i].address, jsonResponse[i].postal_code, jsonResponse[i].phone);
            }
         } else {
            var jsonString = jsonResponse.address + ", " + jsonResponse.postal_code + ", " 
               + jsonResponse.town + ", " + jsonResponse.province;
            codeAddress(jsonString, jsonResponse.name, jsonResponse.address, jsonResponse.postal_code, jsonResponse.phone);
         }
      }
   }
   xmlhttp.send(null);
}

function loadMapScript(index, mapType) {
   itemIndex = index;
   isDetail = mapType;
   var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialize";
   document.body.appendChild(script);
}

function codeAddress(direc, name, site, zipCode, phone) {
   var address = direc;
   geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         if(isDetail == true)
            map.setCenter(results[0].geometry.location);
         var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
         var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: '../www/img/marker.png'
         });
         if(isDetail == false) {
            var infowindow = new google.maps.InfoWindow({ 
               content: '<span class="glyphicon glyphicon-home"></span> <strong>' + name + '</strong><br/>' + site 
                  + '<br/><span><img src="../www/img/letter.png" width="13px" height="13px" align="center" /></span> ' + zipCode
                  + '<br/><span><img src="../www/img/phone.png" width="13px" height="13px" align="center" /></span> ' + phone 
            });  
            infowindow.open(map, marker);
            google.maps.event.addListener(marker, 'click', function() {
               infowindow.open(map, marker);
            });
         } else {
            var infowindow = new google.maps.InfoWindow({ 
               content: '<span class="glyphicon glyphicon-home"></span> <strong>' + name + '</strong><br/>' + site 
                  + '<br/><span><img src="../www/img/letter.png" width="13px" height="13px" align="center" /></span> ' + zipCode
                  + '<br/><span><img src="../www/img/phone.png" width="13px" height="13px" align="center" /></span> ' + phone 
                  + '<p><div id="content" style="width:270px; height:200px;"></div></p>'
            });  
            infowindow.open(map, marker);

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

            google.maps.event.addListener(marker, 'click', function() {
               infowindow.open(map, marker);
            });
         }
      } else {
         alert('Problema con la geolocalización: ' + status);
      }
      $('#content-loader').hide();
      $('#loader').hide();
   });
};
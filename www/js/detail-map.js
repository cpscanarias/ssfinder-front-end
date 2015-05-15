var geocoder;
var map;
var itemIndex;

function initializeDetail() {
   geocoder = new google.maps.Geocoder();
   var myLatlng = new google.maps.LatLng(28.204666, -15.993506);
   var mapProp = {
      center: myLatlng,
      zoom: 13,
   };
   map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_service/" + itemIndex, true);
   xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4) {
         var jsonResponse = JSON.parse(xmlhttp.responseText);
         var jsonString = jsonResponse.address + ", " + jsonResponse.postal_code + ", " 
            + jsonResponse.town + ", " + jsonResponse.province;
         codeAddress(jsonString, jsonResponse.name);
      }
   }
   xmlhttp.send(null);
}

function loadDetailMapScript(index) {
   itemIndex = index;
   var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initializeDetail";
   document.body.appendChild(script);
}

function codeAddress(direc, name) {
   var address = direc;
   geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
         });
         var infowindow = new google.maps.InfoWindow({ content: name });  
         infowindow.open(map, marker); 
      } else {
         alert('Problema con la geolocalización: ' + status);
      }
      $('#content-loader').hide();
      $('#loader').hide();
   });
};

// CUANTO ESTAN CARGADOS LOS DOS MAPAS PETA!!
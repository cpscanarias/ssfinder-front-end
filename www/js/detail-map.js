var geocoder;
var map;

function initializeDetail() {
   geocoder = new google.maps.Geocoder();
   var myLatlng = new google.maps.LatLng(28.204666, -15.993506);
   var mapProp = {
      center: myLatlng,
      zoom: 13,
   };
   map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services/", true);
   xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == 4) {
         var jsonResponse = JSON.parse(xmlhttp.responseText);
         var jsonString = jsonResponse[0].address + ", " + jsonResponse[0].postal_code + ", " 
            + jsonResponse[0].town + ", " + jsonResponse[0].province;
         codeAddress(jsonString, jsonResponse[0].name);
      }
   }
   xmlhttp.send(null);
}

function loadDetailMapScript() {
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
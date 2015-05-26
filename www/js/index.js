var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        FastClick.attach(document.body);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var searchShowed = false;

function setSearch(bool) {
    searchShowed = bool;
}

$('document').ready(function() {
    $('#a-home')[0].click();
    $('#content-loader').show();
    $('#loader').show();

    $('.navbar-collapse ul li a').click(function(e) {
        var opened = jQuery('.navbar-collapse').hasClass('collapse in');
        if ( opened === true ) {
            $('.navbar-toggle').click();
        }
    });

    $('#a-headquarters').click(function() {
        if($('#search-list').is(':empty') || $('#search-null').is(':visible') || (searchShowed == false && $('#headquarters').is(':visible'))) {
            $('#content-loader').show();
            $('#loader').show();
            if(document.getElementById('search-input').value != '')
                document.getElementById('search-input').value = '';
            loadSearch(0, false, null);
            searchShowed = true;
        }
    });

    var mapLoaded = false;
    $('#a-map').click(function() {
        if(!$('#detail .panel-body').is(':empty') || mapLoaded == false) {
            $('#content-loader').show();
            $('#loader').show();
            $('#detail .panel-body').empty();
            loadMapScript(null, false);
            mapLoaded = true;
        }
    });

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services_count/", true);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            var jsonResponse = JSON.parse(xmlhttp.responseText);
            $('#num-headquarters').append(jsonResponse.social_services_count);
            $('#content-loader').hide();
            $('#loader').hide();
        }
    }
    xmlhttp.send(null);
});
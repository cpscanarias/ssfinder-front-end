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

$('document').ready(function() {
    $('#containers > div').hide();
    $('#a-home')[0].click();
    $('#home').show();
    $('#content-loader').show();
    $('#loader').show();

    $('.navbar-brand').click(function() {
        if(!$('#home').is(':visible')) {
            $("#containers > div:visible").hide();
            $('#home').show();
        }
    });

    $('.navbar-collapse ul li a').click(function(e) {
        var opened = jQuery('.navbar-collapse').hasClass('collapse in');
        if ( opened === true ) {
            $('.navbar-toggle').click();
        }

        var href = $(this).attr('href');
        if(!$(href).is(':visible')) {
            $("#containers > div:visible").hide();
            $(href).show();

            if($('#map').is(':visible')) {
                $('#content-loader').show();
                $('#loader').show();
                loadGeneralMapScript();
            };

            if($('#headquarters').is(':visible')) {
                $('#content-loader').show();
                $('#loader').show();
                loadSearch();
            };
        };
    });
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services/", true);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            var jsonResponse = JSON.parse(xmlhttp.responseText);
            $('#num-headquarters').append(jsonResponse.length);
            $('#content-loader').hide();
            $('#loader').hide();
        }
    }
    xmlhttp.send(null);
});
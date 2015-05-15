function loadDetail(index) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_service/" + index, true);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) {
            var jsonResponse = JSON.parse(xmlhttp.responseText);
            loadDetailItem(jsonResponse);
        }
    }
    xmlhttp.send(null);

    function loadDetailItem(jsonTemp) {
        function loadWebItem() {
            var social = '';
            if(jsonTemp.web != '') 
                social += '<p><span><img src="img/web.png" width="19px" height="19px" align="center" /></span> <strong>' + '<a href="' + jsonTemp.web + '">' + jsonTemp.web + '</strong></a></p>';
            return social;
        }

        function loadSocialItems() {
            var social = '';
            if(jsonTemp.facebook != '')
                social += '<p><span><img src="img/facebook.png" width="20px" height="20px" align="center" /></span> ' + '<a href="' + jsonTemp.facebook + '">' + jsonTemp.facebook + '</a></p>';
            if(jsonTemp.twitter != '')
                social += '<p><span><img src="img/twitter.png" width="20px" height="20px" align="center" /></span> ' + '<a href="' + jsonTemp.twitter + '">' + jsonTemp.twitter + '</a></p>';
            if(jsonTemp.instagram != '')
                social += '<p><span><img src="img/instagram.png" width="20px" height="20px" align="center" /></span> ' + '<a href="' + jsonTemp.instagram + '">' + jsonTemp.instagram + '</a></p>';
            if(jsonTemp.google_plus != '')
                social += '<p><span><img src="img/google.png" width="20px" height="20px" align="center" /></span> ' + '<a href="' + jsonTemp.google_plus + '">' + jsonTemp.google_plus + '</a></p>';
            if(jsonTemp.tumblr != '')
                social += '<p><span><img src="img/trumblr.png" width="20px" height="20px" align="center" /></span> ' + '<a href="' + jsonTemp.tumblr + '">' + jsonTemp.tumblr + '</a></p>';
            social += '';
            return social;
        }

        var info = '<p><u>Nombre</u>: <strong>' + jsonTemp.name + '</strong></p>'
            + '<p><u>Categoría</u>: <strong>' + jsonTemp.categories + '</strong></p>'
            + '<p><u>Provincia</u>: <strong>' + jsonTemp.province + '</strong></p>'
            + '<p><u>Municipio</u>: <strong>' + jsonTemp.town + '</strong></p>'
            + '<p><u>Dirección</u>: <strong>' + jsonTemp.address + '</strong></p>'
            + '<p><u>Código Postal</u>: <strong>' + jsonTemp.postal_code + '</strong></p>'
            + '<p><u>Descripción</u>: ' + jsonTemp.description + '</p>';
        var contact = '<p><u>Contacto</u>: </p>'
            + '<p><span><img src="img/phone.png" width="20px" height="20px" align="center" /></span> <strong>' + jsonTemp.phone + '</strong></p>'
            + '<p><span><img src="img/email.png" width="21px" height="21px" align="center" /></span> <strong>' + jsonTemp.email + '</strong></p>'
            + loadWebItem();
        var social = '<p><u>Redes sociales</u>: </p>' + loadSocialItems();
        var map = '<hr/><div id="googleMap"></div>';
        
        if (!$('#detail .panel-body').is(':empty')) 
            $('#detail .panel-body').empty();
        $('#detail .panel-body').append(info + contact + social + map);
        loadDetailMapScript(jsonTemp.id);
    }
};
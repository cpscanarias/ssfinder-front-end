function loadDetail() {
    var info = '<p><u>Nombre</u>: <strong>Aldeas Infantiles SOS</strong></p>'
        + '<p><u>Categoría</u>: <strong>Ayuda infantil</strong></p>'
        + '<p><u>C. Autónoma</u>: <strong>Canarias</strong></p>'
        + '<p><u>Provincia</u>: <strong>Santa Cruz de Tenerife</strong></p>'
        + '<p><u>Municipio</u>: <strong>La Laguna</strong></p>'
        + '<p><u>Dirección</u>: <strong>Calle Fernando Estévez, 7</strong></p>'
        + '<p><u>Código Postal</u>: <strong>38123</strong></p>'
        + '<p><u>Descripción</u>: Esta es una descripción de prueba, aquí se muestran los detalles del servicio social o algo de interes blabla.</p>';
    var contact = '<p><u>Contacto</u>: </p>'
        + '<p><span><img src="img/phone.png" width="20px" height="20px" align="center" /></span> <strong>922123123</strong></p>'
        + '<p><span><img src="img/email.png" width="21px" height="21px" align="center" /></span> <strong>correodelcentro@email.com</strong></p>'
        + '<p><span><img src="img/web.png" width="19px" height="19px" align="center" /></span> <strong>https://webdelcentro.com</strong></p>';
    var social = '<p><u>Redes sociales</u>: </p>'
        + '<p><span><img src="img/facebook.png" width="20px" height="20px" align="center" /></span> https://facebook.com/perfildelcentro</p>'
        + '<p><span><img src="img/twitter.png" width="20px" height="20px" align="center" /></span> https://twitter.com/perfildelcentro</p>'
        + '<p><span><img src="img/instagram.png" width="20px" height="20px" align="center" /></span> https://instagram.com/perfildelcentro</p>'
        + '<p><span><img src="img/google.png" width="20px" height="20px" align="center" /></span> https://www.google.es/perfildelcentro</p>'
        + '<p><span><img src="img/trumblr.png" width="20px" height="20px" align="center" /></span> https://trumblr.com/perfildelcentro</p>';
    var map = '<hr/><h4 style="text-align: center;"><span><img src="img/maps.png" width="20px" height="20px" align="center" /></span> <u>Ubicación</u></h4><div id="googleMap"></div>';
    
    if ($('#detail .panel-body').is(':empty')) {
        $('#detail .panel-body').append(info + contact + social + map);
        loadDetailMapScript();
    };
};
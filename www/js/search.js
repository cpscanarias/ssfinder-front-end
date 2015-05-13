function loadSearch() {
	var htmlTitle = '<a id="headquarter-panel-a" href="#detail"><div id="headquarter-panel"><h3>Centro de prueba</h3>';
	var htmlBody = '<p id="headquarter-panel-info">Categoría, Categoría (<strong>Localidad</strong>, <strong>Provincia</strong>)</p>'
		+ '<p id="headquarter-panel-icons"><span><img src="../www/img/facebook.png" width="19px" height="19px" align="center" /></span> '
		+ '<span><img src="../www/img/twitter.png" width="19px" height="19px" align="center" /></span> '
		+ '<span><img src="../www/img/instagram.png" width="19px" height="19px" align="center" /></span> '
		+ '<span><img src="../www/img/google.png" width="19px" height="19px" align="center" /></span> '
		+ '<span><img src="../www/img/trumblr.png" width="19px" height="19px" align="center" /></span> '
		+ '<span><img src="../www/img/web.png" width="19px" height="19px" align="center" /></span></p></div></a>';
	var count = 0;
	if (!$('#search-list').is(':empty')) {
		$('#search-list').empty();
		while(count < 8) {
			$('#search-list').append(htmlTitle + htmlBody);
			count++;
		}
	} else {
		while(count < 8) {
			$('#search-list').append(htmlTitle + htmlBody);
			count++;
		};
	};

	$(document).on('click', '#search-list > a', function() {
	    var href = $(this).attr('href');
	    $("#containers > div:visible").hide();
	    $(href).show();

	    if($('#detail').is(':visible')) {
	        loadDetail();
	    };
	});
};

function loadPagination() {
	var pagination = '<li><a href="/#" aria-label="Anterior"><span aria-hidden="true">&laquo;</span></a></li>'
		+ '<li><a href="/#">1</a></li>'
		+ '<li><a href="/#">2</a></li>'
		+ '<li><a href="/#">3</a></li>'
		+ '<li><a href="/#" aria-label="Siguiente"><span aria-hidden="true">&raquo;</span></a></li>';
	if (!$('#pagination').is(':empty')) {
		$('#pagination').empty();
		$('#pagination').append(pagination);
	} else {
		$('#pagination').append(pagination);
	};
};                            
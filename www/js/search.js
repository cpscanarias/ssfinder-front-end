function loadSearch() {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services/", true);
	xmlhttp.onreadystatechange = function() {
	    if(xmlhttp.readyState == 4) {
	        var jsonResponse = JSON.parse(xmlhttp.responseText);
	        loadSearchList(jsonResponse);
	        loadPagination();
	    }
	}
	xmlhttp.send(null);

    function loadSearchList(jsonTemp) {
    	function loadItem(index) {
			var htmlTitle = '<a id="headquarter-panel-a" href="#detail"><div id="headquarter-panel"><h3>' + jsonTemp[index].name + '</h3>';
			var htmlBody = '<p id="headquarter-panel-info">' + jsonTemp[index].categories + '<br/><strong>' + jsonTemp[index].town 
				+ '</strong> (<strong>' + jsonTemp[index].province + '</strong>)<br/>';
			var social = loadSocialItems(index);
			return htmlTitle + htmlBody + social + '</p></div></a>';
		};

		function loadSocialItems(index) {
			var social = '';
			if(jsonTemp[index].web != '') 
				social += '<span><img src="../www/img/web.png" width="19px" height="19px" align="center" /></span> ';
			if(jsonTemp[index].facebook != '')
				social += '<span><img src="../www/img/facebook.png" width="19px" height="19px" align="center" /></span> ';
			if(jsonTemp[index].twitter != '')
				social += '<span><img src="../www/img/twitter.png" width="19px" height="19px" align="center" /></span> ';
			if(jsonTemp[index].instagram != '')
				social += '<span><img src="../www/img/instagram.png" width="19px" height="19px" align="center" /></span> ';
			if(jsonTemp[index].google_plus != '')
				social += '<span><img src="../www/img/google.png" width="19px" height="19px" align="center" /></span> ';
			if(jsonTemp[index].tumblr != '')
				social += '<span><img src="../www/img/trumblr.png" width="19px" height="19px" align="center" /></span> ';
			social += '';
			return social;
		}
		
		if (!$('#search-list').is(':empty')) {
			$('#search-list').empty() ;
			for(i = 0; i < jsonTemp.length; i++) {
				$('#search-list').append(loadItem(i));
			}
		} else {
			for(i = 0; i < jsonTemp.length; i++) {
				$('#search-list').append(loadItem(i));
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
	$('#content-loader').hide();
    $('#loader').hide();
};                            
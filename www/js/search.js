var size;
var pageNum;
var search;
var searchString;

function loadSearch(initCount, isSearch, searchData) {
	size = 0;
    pageNum = 0;
	function loadSearchList(jsonTemp) {
    	function loadPanel(index) {
    		var categoriesSplited = JSON.stringify(jsonTemp[index].categories).split("\"").join('');
    		categoriesSplited = categoriesSplited.split("[").join('');
			categoriesSplited = categoriesSplited.split("]").join('');
			categoriesSplited = categoriesSplited.split(",").join(', ');
			var htmlTitle = '<a id="' + jsonTemp[index].id + '" class="headquarter-panel-a" href="#detail"><div id="headquarter-panel"><h3>' + jsonTemp[index].name + '</h3>';
			var htmlBody = '<p id="headquarter-panel-info">' + categoriesSplited + '<br/><strong>' + jsonTemp[index].town 
				+ '</strong> (' + jsonTemp[index].province + ')<br/>';
			var social = loadSocialData(index);
			return htmlTitle + htmlBody + social + '</p></div></a>';
		};

		function loadSocialData(index) {
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
		
		function initPanels(size) {
			if(size == 0) {
				var html = '<p id="search-null"><h3><span><img src="img/error.png" width="24px" height="24px" align="center" /></span> No se han obtenido resultados.</h3></p>'
					+ '<h4>Prueba algunas recomendaciones:</h4>'
					+ '<h5>- Comprueba que las <strong>palabras</strong> están <strong>bien escritas</strong>.</h5>'
					+ '<h5>- Busca por <strong>nombre</strong>, <strong>categorías</strong> o <strong>dirección</strong>.</h5>'
					+ '<h5>- Borra <strong>caracteres extraños</strong> o <strong>espacios de más</strong>.</h5>'
					+ '<h5>- Si tu búsqueda es correcta, envía un email con los datos a <strong>ssfinder@aldeasinfantiles.es</strong> y añadiremos el centro.</h5>'
					+ '<h5>Pulsa <strong><span class="glyphicon glyphicon-search"></span> Servicios Sociales</strong> para volver a la lista principal.</h5>';
				$('#search-list').empty();
				$('#pagination').empty();
				$('#search-list').append(html);
			} else {
				for(i = 0; i < size; i++)
					$('#search-list').append(loadPanel(i));
			}
			$('#content-loader').hide();
            $('#loader').hide();
		}

		if(!$('#search-list').is(':empty'))
			$('#search-list').empty();
		initPanels(jsonTemp.length);
	};

	$('#content-loader').show();
    $('#loader').show();

    search = isSearch;
    searchString = searchData;
    pageNum = initCount;
	xmlhttp = new XMLHttpRequest();
	if(isSearch)
		xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services_search/" + searchData + "/?page=" + (initCount + 1), true);
	else
		xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services_summary/?page=" + (initCount + 1), true);
	xmlhttp.onreadystatechange = function() {
	    if(xmlhttp.readyState == 4) {
	    	var jsonTemp = JSON.parse(xmlhttp.responseText);
	        var jsonResponse = jsonTemp.results;
	        size = jsonTemp.count;
	        loadSearchList(jsonResponse);
	        if(isSearch) {
	        	if(jsonResponse.length > 9) {	        	
	        		if($('#pagination').is(':empty'))
	        			loadPagination(jsonResponse);
	        	}
	        } else
	        	if($('#pagination').is(':empty'))
	        		loadPagination(jsonResponse);
	    }
	}
	xmlhttp.send(null);
};

function pageSelected(pageIndex, sizeTemp) {
	if(!$('#page' + pageIndex).is('.active')) {
		$('#pagination > li').removeClass('active');
		$('#page' + pageIndex).addClass('active');
		pageNum = parseInt(pageIndex);
		
		if(pageNum == (sizeTemp - 1)) {
			$('#right-arrow').addClass('disabled');
			$('#left-arrow').removeClass('disabled');
		}
		if(pageNum == 0) {
			$('#left-arrow').addClass('disabled');
			$('#right-arrow').removeClass('disabled');
		}
		if(pageNum > 0 && pageNum < (sizeTemp - 1)) {
			$('#left-arrow').removeClass('disabled');
			$('#right-arrow').removeClass('disabled');
		}
		if(search)
			loadSearch(pageNum, true, searchString);
		else
			loadSearch(pageNum, false, null);
	}
}

function loadPagination(jsonTemp) {
	var pagination;
	var sizeTemp = parseInt(size / jsonTemp.length);
	if((size % jsonTemp.length) != 0)
		sizeTemp++;

	if(size > 10) {
		pagination = '<li id="left-arrow"><a href="#headquarters" aria-label="Anterior"><span aria-hidden="true">&laquo;</span></a></li>'
		for(i = 0; i < sizeTemp; i++) 
			pagination += '<li id="page' + i + '"><a id="pageLink" href="#headquarters" onClick="pageSelected(\'' + i + '\', \'' + sizeTemp + '\')">' + (i + 1) + '</a></li>';
		pagination += '<li id="right-arrow"><a href="#headquarters" aria-label="Siguiente"><span aria-hidden="true">&raquo;</span></a></li>';
	}

	if (!$('#pagination').is(':empty'))
		$('#pagination').empty();
	$('#pagination').append(pagination);
	$('#left-arrow').addClass('disabled');
	$('#page0').addClass('active');
	
	$('#left-arrow').click(function() {
		if(!$('#left-arrow').is('.disabled')) {
			pageNum--;
			pageSelected(pageNum, sizeTemp);
		}
	});

	$('#right-arrow').click(function() {
		if(!$('#right-arrow').is('.disabled')) {
			pageNum++;
			pageSelected(pageNum, sizeTemp);
		}
	});

	$('#content-loader').hide();
    $('#loader').hide();
};

$(document).on('click', '#search-list > a', function() {
	$('#content-loader').show();
    $('#loader').show();
    if (!$('#detail .panel-body').is(':empty')) 
        $('#detail .panel-body').empty();
    if(!$('#map #googleMap').is(':empty'))
    	$('#map #googleMap').empty();
	loadDetail(this.id);;
});

$("#search-input").keyup(function (e) {
    if (e.keyCode == 13) 
        $('#search-button')[0].click();
});

$(document).on('click', '#search-button', function() {
	if(document.getElementById('search-input').value != '') {
		setSearch(false);
		var irrelevantWords = ["a", "ante", "cabe", "con", "contra", "de", "desde", "en", 
			"entre", "hasta", "para", "por", "segun", "sobre", "tras", "durante", "mediante", 
			"sin", "con", "el", "la", "los", "las", "un", "una", "unos", "unas", "al", "del",
			"e", "es", "lo", "los", "y"];
		var searchWords = [];

		var searchValue = document.getElementById('search-input').value;
		searchValue = searchValue.split(" ").join(',').toLowerCase();

		for(i = 0; i < searchValue.split(",").length; i++)
			searchWords[i] = searchValue.split(",")[i];
		for(i = 0; i < searchWords.length; i++) {
			for(j = 0; j < irrelevantWords.length; j++) {
				if(searchWords[i] == irrelevantWords[j])
					searchWords.splice(i, 1);
			}
		}

		var searchData = "";
		for(i = 0; i < searchWords.length; i++) 
			if(searchWords[i] != '')
				searchData += searchWords[i] + "/";
		if(searchData != '') {
			if(!$('#pagination').is(':empty'))
				$('#pagination').empty();
			loadSearch(0, true, searchData);
		}
	}
});
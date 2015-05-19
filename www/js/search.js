var size = 0;
var pageNum = 0;

function loadSearch(initCount) {
	function loadSearchList(jsonTemp) {
    	function loadItem(index) {
			var htmlTitle = '<a id="' + jsonTemp[index].id + '" class="headquarter-panel-a" href="#detail"><div id="headquarter-panel"><h3>' + jsonTemp[index].name + '</h3>';
			var htmlBody = '<p id="headquarter-panel-info">' + jsonTemp[index].categories + '<br/><strong>' + jsonTemp[index].town 
				+ '</strong> (' + jsonTemp[index].province + ')<br/>';
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
		
		function loadJSONItem(size) {
			for(i = 0; i < size; i++) {
				$('#search-list').append(loadItem(i));
			}
			$('#content-loader').hide();
            $('#loader').hide();
		}

		if(!$('#search-list').is(':empty'))
			$('#search-list').empty();
		loadJSONItem(jsonTemp.length);

		$(document).on('click', '#search-list > a', function() {
		    var href = $(this).attr('href');
		    $("#containers > div:visible").hide();
		    $(href).show();

		    if($('#detail').is(':visible')) {
		    	$('#content-loader').show();
                $('#loader').show();
		        loadDetail(this.id);
		    };
		});
	};

	$('#content-loader').show();
    $('#loader').show();

    pageNum = initCount;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","http://www.robotclip.org:4088/social_service/social_services_summary/?page=" + (initCount + 1), true);
	xmlhttp.onreadystatechange = function() {
	    if(xmlhttp.readyState == 4) {
	    	var jsonTemp = JSON.parse(xmlhttp.responseText);
	        var jsonResponse = jsonTemp.results;
	        size = jsonTemp.count;
	        loadSearchList(jsonResponse);
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
		
		if(pageNum == sizeTemp) {
			$('#right-arrow').addClass('disabled');
			$('#left-arrow').removeClass('disabled');
		}
		if(pageNum == 0) {
			$('#left-arrow').addClass('disabled');
			$('#right-arrow').removeClass('disabled');
		}
		if(pageNum > 0 && pageNum < sizeTemp) {
			$('#left-arrow').removeClass('disabled');
			$('#right-arrow').removeClass('disabled');
		}
		loadSearch(pageNum);
	}
}

function loadPagination(jsonTemp) {
	var pagination;
	var sizeTemp = parseInt(size / jsonTemp.length);

	if(jsonTemp.length > 1) {
		pagination = '<li id="left-arrow"><a href="#" aria-label="Anterior"><span aria-hidden="true">&laquo;</span></a></li>'
		for(i = 0; i <= sizeTemp; i++) {
			pagination += '<li id="page' + i + '"><a id="pageLink" href="#" onClick="pageSelected(\'' + i + '\', \'' + sizeTemp + '\')">' + (i + 1) + '</a></li>';
		}
		pagination += '<li id="right-arrow"><a href="#" aria-label="Siguiente"><span aria-hidden="true">&raquo;</span></a></li>';
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
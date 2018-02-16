function showResources() {
	$("#resources").toggle();
}

function showObjects() {
	$("#objects").toggle();
}

function showRelations() {
	$("#relations").toggle();
}

function showTwitterObjects() {
	$("#twitterObjects").toggle();	
}

function showFacebookObjects() {
	$("#facebookObjects").toggle();	
}

function showRedditObjects() {
	$("#redditObjects").toggle();	
}

function showTwitterUserProperties() {
	$("#twitterUserProperties").toggle();
}

function showTwitterTweetProperties() {
	$("#twitterTweetProperties").toggle();
}

function showTwitterGeoProperties() {
	$("#twitterGeoProperties").toggle();
}

function showTwitterPlaceProperties() {
	$("#twitterPlaceProperties").toggle();
}

function showTwitterCoordinateProperties() {
	$("#twitterCoordinateProperties").toggle();
}

function showTwitterEntityProperties() {
	$("#twitterEntityProperties").toggle();
}

function addMask(elementToShow) 
{
	var maskWidth = $(document).width();
	var maskHeight = $(document).height();
	$('<div class="mask"></div>').appendTo($('body'));
	$('div.mask').css({
		'position':'absolute',
		'top':0,
		'left':0,
		'background':'black',
		'opacity':0.5,
		'width':maskWidth,
		'height':maskHeight,
		'z-index':999
	});
	document.getElementById(elementToShow).style.zIndex = 1000;
}

function removeMask(elementToShow) 
{
	$('div.mask').remove();
	document.getElementById(elementToShow).style.zIndex = 0;
}
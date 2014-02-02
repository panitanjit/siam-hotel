/*Full screen Mode on browser*/

function requestFullScreen(element) {
	var el = document.documentElement
	, rfs = // for newer Webkit and Firefox
	       el.requestFullScreen
	    || el.webkitRequestFullScreen
	    || el.mozRequestFullScreen
	    || el.msRequestFullScreen
	;
	if(typeof rfs!="undefined" && rfs){
	  rfs.call(el);
	} else if(typeof window.ActiveXObject!="undefined"){
	  // for Internet Explorer
	  var wscript = new ActiveXObject("WScript.Shell");
	  if (wscript!=null) {
	     wscript.SendKeys("{F11}");
	  }
	}
}

function fullscreen(element){
	 var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

	if (requestMethod) { // Native full screen.
	        requestMethod.call(element);
	} else if(typeof window.ActiveXObject!="undefined"){
	  // for Internet Explorer
	  var wscript = new ActiveXObject("WScript.Shell");
	  if (wscript!=null) {
	     wscript.SendKeys("{F11}");
	  }
	}
}

function cancelFullScreen(el) {
    var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen;
    if (requestMethod) { // cancel full screen.
        requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function toggleFull() {
    var elem = document.body; // Make the body go full screen.
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

    if (isInFullScreen) {
        cancelFullScreen(document);
    } else {
        requestFullScreen(elem);
    }
    return false;
}

function fullScreen(theURL) {
	window.open(theURL, '', 'fullscreen=yes, scrollbars=auto' );
}

function Refresh(element) {
	window.location.reload();
}
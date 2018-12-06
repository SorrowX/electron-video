(function(doc, win) {
	var designWidth = 750,
	    htmlFontSizeVal = 100,
	    docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function() {
	    	var clientWidth = docEl.clientWidth
	    	if (!clientWidth) return
	    	if (clientWidth >= designWidth) {
	    		docEl.style.fontSize = htmlFontSizeVal + 'px'
	    	} else if (clientWidth <= designWidth / 2) {
				docEl.style.fontSize = htmlFontSizeVal / 2 + 'px'
	    	}else {
	    		docEl.style.fontSize = ((clientWidth / designWidth) * htmlFontSizeVal) + 'px'
	    	}
	    }

	if (!doc.addEventListener) return
	win.addEventListener(resizeEvt, recalc, false)
	doc.addEventListener('DOMContentLoaded', recalc, false)
	recalc()
})(document, window)
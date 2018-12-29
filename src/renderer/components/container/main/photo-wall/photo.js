import drag from './drag'

export var ONE_BY_ONE = true
export var PHOTO_WIDTH = [200, 240] // 随机选取一个图片容器的宽度
export var TOP_HEIGHT = 0 // 照片墙图片距离容器顶部的距离
export var imgMaxNum = 50 // 照片墙显示的最大图片数量
export var transitionTime = 1 // transition动画的过渡时间单位/秒

var mouseDownTransitionStyle = `
    box-shadow ${transitionTime}s ease, 
    transform ${transitionTime}s ease, 
    opacity ${transitionTime}s ease`

var getTransitionCssText = function(timingFunction) {
	timingFunction = timingFunction || 'ease'
	return `
	    box-shadow ${transitionTime}s ${timingFunction}, 
	    transform ${transitionTime}s ${timingFunction}, 
	    opacity ${transitionTime}s ${timingFunction}, 
	    left ${transitionTime}s ${timingFunction}, 
	    top ${transitionTime}s ${timingFunction}
	`
}
var raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : function(fn) {
    	setTimeout(fn, 1000 / 60)
    }

function nextFrame(fn) {
	raf(function() {
		fn && fn()
	})
}


var getRandomItem = function () {
    var preItem = null
    return function (arr) {
        var index = Math.floor(Math.random() * arr.length),
            item = arr[index],
            result
        arr = arr.sort(function() {
            return Math.random() > 0.5 ? -1 : 1
        })
        if (preItem != item) {
            result = preItem = item
           } else {
            result = getRandomItem(arr)
        }
        return result
    }
}()

var shuffle = function (arr) {
    var copyArr = arr.slice()
    for (var i = 0; i < copyArr.length; i++) {
        var j = getRandomNum(0, i)
        var t = copyArr[i]
        copyArr[i] = copyArr[j]
        copyArr[j] = t
    }
    return copyArr
}

async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve()
		}, ms || 1000)
	})
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var getArrData = function setArrData() {
	let arr = []
	if (resource.length >= imgMaxNum) {
		arr = shuffle(resource)
		arr.length = imgMaxNum
	} else {
		arr = resource
	}
	return arr
}

export function setShowType(bool) {
	ONE_BY_ONE = bool
}

let handlerClick = function() {}
let resource = []
export default function initPhoto(options) {
	let { resourceArr, clickCb } = options
	handlerClick = clickCb
	resource = resourceArr
	unBindEvent() // 解绑以前的数据
	nextFrame(() => {
		insertPhotoDom()
		caclPhotoPositionAndRotate()
		bindEvent()
		if (ONE_BY_ONE) {
			grantPhoto()
		}
	})
}

// 生成图片dom
export var insertPhotoDom = function() {
	var oParent = document.querySelector('.photo-wrapper')
	oParent.appendChild(_genDocfrag())
}
function _genDocfrag() {
	var arrData = getArrData()
	var docfrag = document.createDocumentFragment()
	arrData.forEach(function(data) {
        docfrag.appendChild(getPhotoDiv(data))
	})
	return docfrag

	function getPhotoDiv(data) {
		var div = document.createElement('div')
		div.setAttribute('class', 'photo')
		var img = document.createElement('img')
		img.setAttribute('src', data.genImgPath)
		img.dataset['item'] = JSON.stringify(data)
		div.appendChild(img)
		return div
	}
}


// 计算图片位置
export var caclPhotoPositionAndRotate = function(oneByOne) {
	oneByOne = oneByOne
	var aPhotoDom = document.querySelectorAll('.photo')
	Array.apply(null, aPhotoDom).forEach(function(dom) {
		let randomWidth = getRandomItem(PHOTO_WIDTH)
		dom.style.width = randomWidth + 'px'
		var position = _getPosition(dom, randomWidth)
		if (!oneByOne) {
			dom.style.left = position.left + 'px'
			dom.style.top = position.top + 'px'
		} else {
			var centerPosition = _getScreenCenterPosition(dom)
			dom.style.left = centerPosition.left + 'px'
			dom.style.top = centerPosition.top + 'px'
			dom.style.opacity = 0
			dom.__left__ = position.left
			dom.__top__ = position.top
			dom.__rotate__ = 'rotate(' + _getRotate() + 'deg)'
		}
		dom.style.transform = 'rotate(' + _getRotate() + 'deg)'
		dom.style.transition = getTransitionCssText()
	})
}

// 展示动画
let stopAnimate = false
export let grantPhoto = async function() {
	caclPhotoPositionAndRotate(true)
	let aPhotoDom = document.querySelectorAll('.photo')
	await sleep(1200)
	for (let i = 0; i < aPhotoDom.length; i++) {
		if (!stopAnimate) {
			await setPhotoStylePropAndListener(aPhotoDom[i])
			await sleep(300)
		} else {
			stopAnimate = false
			break
		}
	}
}
export function stop() {
	stopAnimate = true
}

async function setPhotoStylePropAndListener(dom) {
	return new Promise((resolve, reject) => {
		let s = dom.style
		s.transition = getTimingFunction()
        s.opacity = 1
		s.left = dom.__left__ + 'px'
        s.top = dom.__top__ + 'px'
        s.transform = dom.__rotate__

		dom.addEventListener('transitionend', dom._moveCb = function cb (evt) {
	        if (/left$/.test(evt.propertyName)) {
	            dom.removeEventListener('transitionend', cb)
	            dom._moveCb = null
	            dom.style.transition = getTransitionCssText() // 恢复默认css属性
				return resolve()
	        }
        })
	})
}

function getTimingFunction() {
	var f = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 
	'cubic-bezier(.24,1.13,.94,1.16)', 'cubic-bezier(0,.72,.43,-0.53)', 
	'cubic-bezier(0,1.41,1,-0.63)', 'cubic-bezier(1,-0.13,.15,1.83)', 
	'cubic-bezier(.73,-1.29,0,1.82)', 'cubic-bezier(.91,-1.15,0,1.53)']
	return getTransitionCssText(getRandomItem(f))
}

// 计算一个dom在.photo-wrapper容器中的中点坐标
function _getScreenCenterPosition(dom) {
	var domStyle = window.getComputedStyle(dom, null)
	var width = parseInt(domStyle['width'])
	var height = parseInt(domStyle['height'])
	var oWrapper = document.querySelector('.photo-wrapper')
	var wrapperStyle = window.getComputedStyle(oWrapper, null)
	var wrapperWidth = parseInt(wrapperStyle['width'])
	var wrapperHeight = parseInt(wrapperStyle['height'])

	return {
		left: parseInt(wrapperWidth/2 - width/2),
		top: parseInt(wrapperHeight/2 - height/2)
	}
}

// 在.photo-wrapper容器中随机获取一个坐标
function _getPosition (dom, randomWidth) {
	var x = [], y = []
	var xMin, xMax, yMin, yMax
	var oWrapper = document.querySelector('.photo-wrapper')
	var xWidth = oWrapper.offsetWidth * .9
	var dVal = oWrapper.offsetWidth - xWidth
	xMin = parseInt(dVal / 2)
	xMax = parseInt(xWidth + xMin - randomWidth)
    for (var i = xMin; i < xMax; i++) {
        x.push(i)
    }
    yMin = TOP_HEIGHT
    yMax = oWrapper.offsetHeight - _getPhotoDomHeight(dom, randomWidth)
    for (i = yMin; i < yMax; i++) {
        y.push(i)
    }
    return { left: getRandomItem(x), top: getRandomItem(y) }
}
function _getPhotoDomHeight(dom, randomWidth) {
	let actualWidth = parseInt(window.getComputedStyle(dom, null)['width'])
	let actualHeight = parseInt(window.getComputedStyle(dom, null)['height'])
	return (actualHeight * randomWidth / actualWidth).toFixed(0)
}

// 获取一个随机的旋转角度
function _getRotate () {
	var arr = []
	Array.apply(null, { length: 360 }).map(function(item, index) {
		arr.push(index + 1, index * -1 - 1)
	})
	return getRandomItem(arr)
}

let dblClickFn = function(dom) {
	return
	return function(evt) {
		dom.style.opacity = 0
		dom.__trigger_dblclick__ = true
	}
}
let transitionEndFn = function(dom) {
	return
	return function(evt) {
		if (/opacity$/.test(evt.propertyName)) {
			if (dom.__trigger_dblclick__) {
				dom.style.display = 'none'
			}
		}
	}
}
let clickFn = function(evt) {
	handlerClick && handlerClick(JSON.parse(evt.target.dataset.item))
}
export var bindEvent = function() {
	var aPhotoDom = document.querySelectorAll('.photo')
	Array.apply(null, aPhotoDom).forEach(function(dom) {
		drag(dom, function() {
			dom.style.transition = mouseDownTransitionStyle
		}, null, function() {
			dom.style.transition = getTransitionCssText()
		})
		bindDblclick(dom)
		bindTransitionend(dom)
		bindClick(dom)
	})

	function bindDblclick(dom) {
		dom.addEventListener('dblclick', dblClickFn(dom), false)
	}

	function bindTransitionend(dom) {
		dom.addEventListener('transitionend', transitionEndFn(dom), false)
	}

	function bindClick(dom) {
		dom.addEventListener('click', clickFn, false)
	}
}

export var unBindEvent = function() {
	var aPhotoDom = document.querySelectorAll('.photo')
	Array.apply(null, aPhotoDom).forEach(function(dom) {
		dom.onmousedown = null
		dom.removeEventListener('dblclick', dblClickFn(dom))
		dom.removeEventListener('transitionend', transitionEndFn(dom))
		dom.removeEventListener('click', clickFn)
	})
	document.querySelector('.photo-wrapper').innerHTML = ''
}
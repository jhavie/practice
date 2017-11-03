// 抖动
export const debounce = function (func, wait, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args)
		};
		var callNow = immediate & !timeout
		clearTimeout(timeout);
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

// 节流
export const throttle = function (func, wait, mustRun) {
	var timeout,
		startTime = new Date()

	return function() {
		var context = this,
			args = arguments,
			curTime = new Date()

		clearTimeout(timeout)
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= mustRun){
			func.apply(context, args)
			startTime = curTime
		// 没达到触发间隔，重新设定定时器
		} else{
			timeout = setTimeout(func, wait)
		}
	}
}
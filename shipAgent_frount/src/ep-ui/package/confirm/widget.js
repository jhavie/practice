import Vue from 'vue';


var confirm = function (options, callback, errCall) {
  if (Vue.prototype.$isServer) return;
  options = options || {}
  if (typeof options === 'string') {
		options = {
			word: options
		}
	}
}

export default confirm;
                                   
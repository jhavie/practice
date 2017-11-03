import Vue from 'vue';
import popManager from '../../src/popup/popup-manager';

let message,
    messages = [],
    sequence = 1,
    MessageClass = Vue.extend(require('./message.vue'));

var Message = function(options) {
	if (Vue.prototype.$isServer) return;
	options = options || {};
	if (typeof options === 'string') {
		options = {
			message: options
		}
	}
	let callback = options.callback;
	let id = `message-${sequence}`;
	options.callback = function () {
		Message.close(id, callback);
	}

	message = new MessageClass({ data: options });
	//props and function is here
	message.id = id;
	message.vm = message.$mount();
	document.body.appendChild(message.vm.$el);
	message.vm.visible = true;
	message.dom = message.vm.$el;
	message.dom.style.zIndex = popManager.next();
	messages.push(message);
	return message.vm;
};

['info', 'success', 'warning', 'error'].forEach(type => {
	Message[type] = options => {
		if (typeof options === 'string') {
			options = {
				message: options
			};
		}
		options.type = type;
		return Message(options);
	}
});

Message.close = function(id, callback) {
  for (let i = 0, len = messages.length; i < len; i++) {
    if (id === messages[i].id) {
      if (typeof callback === 'function') {
        callback(messages[i]);
      }
      messages.splice(i, 1);
      break;
    }
  }
};

export default Message;
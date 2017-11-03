import store from "../vuex/store";
import NProgress from "nprogress"; //页面顶部进度条
import "nprogress/nprogress.css";

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';


function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {

    fetchUtil(url, body, vm, fn1, fn2, fn3, headers) {
        var _this = this;
        url += '?refresh_token=' + store.getters.getRefreshToken
        let ajaxHeaders = headers || { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
        fetch(HOST + url, {
            method: "POST",
            headers: ajaxHeaders,
            body: body
        }).then(function (response) {
            return response.json();
        }).then(function (responseData) {
            if (responseData.open_status) {
                fn1.call(vm, responseData)
            } else {
                if (fn3) { fn3.call(vm, responseData) }
                vm.$message.error('获取失败，请稍后再试');
            }
        }).catch(function (e) {
            console.log("Oops, error" + e);
            if (fn2) { fn2.call(vm, e) } 
        });
    },
    getPermission (body, vm, fn1) {
        var _this = this;
        const url = global.HOST + '/getPermission'
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        }).then(function (response) {
            return response.json();
        }).then(function (responseData) {
            if (responseData.code === "1") {
                fn1.call(vm, responseData.data);
            } else {
                _this.delCookie('eptoken');
                vm.$router.replace('/Login');
            }
            NProgress.done();
        }).catch(function (e) {
            NProgress.done();
            _this.delCookie('eptoken');
            vm.$router.replace('/Login');
        });
    },
    reset(obj) {
        for (let variable in obj) {
            if (obj.hasOwnProperty(variable)) {
                if (typeof obj[variable] === 'string') {
                    // console.log(obj[variable]);
                    obj[variable] = '';
                } else if (typeof obj[variable] === 'number') {
                    obj[variable] = 0;
                }
            }
        }
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {


        format: function (date, pattern) {

            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },

    isEmpty: function (obj) {
        if (obj === null || obj === "" || obj === "undefined") {
            return true;
        } else {
            return false;
        }
    },

    trim: function(str) {
        if (typeof str === 'string') {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    }


};

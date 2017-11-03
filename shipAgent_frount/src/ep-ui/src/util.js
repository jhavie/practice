var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';


function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    strlen(str) { //JS 判断中英文字符长度
        var len = 0;
        if (typeof str === 'string') {
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                //单字节加1 
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    len++;
                } else {
                    len += 2;
                }
            }

        }

        return len;
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
    getQueryStringByName: function(name) {
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


        format: function(date, pattern) {

            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }

    },

    setCookie(key, value, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 60 * 24 * 60 * 1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires;
    },

    getCookie(name) {
        let cname = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(cname) == 0)
                return c.substring(cname.length, c.length);
        }
        return "";
    },

    delCookie(name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let val = this.getCookie(name);
        if (val != null)
            document.cookie = name + "=" + val + ";expires=" + exp.toGMTString();
    },

    isEmpty: function(obj) {
        if (obj === null || obj === "" || obj === "undefined") {
            return true;
        } else {
            return false;
        }
    },

    tirm: function(str) {
        if (typeof str === 'string') {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    }

};
/* basic function */
/**
 * target:
 *
 ** check cookies
 ** set cookies
 ** options
 *** element (DOM)
 *** callbacks on accept
 *** tracking
 *** language?
 ***
 *
 *
 *
 *
 */
var CookieBanner = function (options) {
    console.info(options);
    // configs
    var cookieName = 'c_cookies';
    var elementClickAccept = options.element.getElementsByClassName(options.buttonAcceptClass)[0];

    var onCookieNotSet = options.onCookieNotSet || function () {

        };
    var onAccept = options.onAccept || function () {

        };

    var get13month = function () {
        var z = new Date();
        var month = z.getMonth() + 1;
        var year = z.getFullYear() + 1;
        if (month > 11) {
            month = 0;
            year++;
        }
        return new Date(year, month, z.getDay(), z.getHours(), z.getMinutes(), z.getSeconds(), z.getMilliseconds());

    };

    var _onUserAccept = function () {
        setCookie(cookieName, true, get13month());
        onAccept();

        window.onscroll = null;
        window.onclick = null;
        elementClickAccept.onclick = null;

    };

    // ugly functions to handle cookies taken from: http://www.w3schools.com/js/js_cookies.asp
    // with some improvements: escape/unescape functions changed to encodeURIComponent/decodeURIComponent
    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return decodeURIComponent(y);
            }
        }
    }

    function setCookie(c_name, value, exdays) {
        var c_value = encodeURIComponent(value) + ((exdays === null) ? "" : "; expires=" + exdays.toUTCString()) + '; path=/ ; domain =.' + document.location.host;
        document.cookie = c_name + "=" + c_value;
    }

    if (!getCookie(cookieName)) {
        console.info('getCookie(cookieName)', cookieName);
        onCookieNotSet();
        if (options.activation.button) {
            elementClickAccept.onclick = _onUserAccept;
        }
        if (options.activation.scroll) {
            window.onscroll = _onUserAccept;
        }
        if (options.activation.click) {
            window.onclick = _onUserAccept
        }
    }
    else {
        onAccept();
    }

    debug.onclick = function (e) {
        console.info('debug remove cookies');
        this.innerHTML = 'NOW!';
        setCookie(cookieName, false, new Date(0));
        e.stopImmediatePropagation();
    };

    this.setCookies = setCookie;

};

new CookieBanner({
    element: cnil,
    analytics: true,
    activation: {
        scroll: true,
        click: true,
        button: true
    },
    buttonAcceptClass: 'JS_accept_cookies',
    onCookieNotSet: function () {
        console.info('onCookieNotSet');
        cnil.style.display = 'block';
    },
    onAccept: function () {
        console.info('onAccept');
        cnil.style.display = 'none';
        //launch tracking
        initTracking();
    }
});
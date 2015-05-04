var hebeutils = (function () {
    var private_var;

    function private_function() {
    }

    function setupExtensionFunctions() {
        //console.log('Setting up extension functions');
        // str.trimString(string)
        if (typeof String.prototype.trimString != 'function') {
            String.prototype.trimString = function (str) {
                var tmp = this;
                tmp = this.ensureNoStartingString(str);
                tmp = this.ensureNoEndingStrign(str);
                return tmp;
            };
        }
        // str.ensureNoStartingString
        if (typeof String.prototype.ensureNoStartingString != 'function') {
            String.prototype.ensureNoStartingString = function (str) {
                if (this.startsWith(str)) {
                    return this.substr(str.length);
                }
            };
        }
        // str.startsWith
        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.slice(0, str.length) == str;
            };
        }
        // str.endsWith
        if (typeof String.prototype.endsWith != 'function') {
            String.prototype.endsWith = function (str) {
                return this.slice(-str.length) == str;
            };
        }
        // str.ensureNoEndingString
        if (typeof String.prototype.ensureNoEndingString != 'function') {
            String.prototype.ensureNoEndingString = function (str) {
                if (this.endsWith(str)) {
                    return this.substr(0, this.length - str.length);
                }
            };
        }
        // str.toPrecisionDigits
        if (typeof Number.prototype.toPrecisionDigits != 'function') {
            Number.prototype.toPrecisionDigits = function (len) {
                var str = this.toString();
                // figure out how many decimal places we want
                var numberOfDecimalPlaces = (
                    str.indexOf('.') === -1 ?
                        0 :
                        (3 - (str.indexOf('.')))
                    );
                var rounded = utils.evenRound(this, numberOfDecimalPlaces);
                return rounded;
            };
        }
        // str.fixChars
        if (typeof String.prototype.fixChars != 'function') {
            String.prototype.fixChars = function (str) {
                //todo: replace any dodgy characters here
                return this.replace('ÂŁ', '£').replace('__', "'");
            };
        }

        // str.cleanDateFormats
        if (typeof String.prototype.cleanDateFormats != 'function') {
            String.prototype.cleanDateFormats = function () {
                var sanitizedStr = this;
                sanitizedStr = sanitizedStr.replace('T00:00:00', '');
                return sanitizedStr;
            };
        }
    };

    return {
        init: function () {
            setupExtensionFunctions();
        },
        random: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        isArray: function (target) {
            return (Object.prototype.toString.call(target) === '[object Array]');
        },
        parseNumber: function (string) {
            var str = string.toString();
            var number = str.replace(/[^0-9\.]+/g, '');
            return parseFloat(number);
        },
        evenRound: function (num, decimalPlaces) {
            var d = decimalPlaces || 0;
            var m = Math.pow(10, d);
            var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
            var i = Math.floor(n), f = n - i;
            var e = 1e-8; // Allow for rounding errors in f
            var r = (f > 0.5 - e && f < 0.5 + e) ?
                ((i % 2 == 0) ? i : i + 1) : Math.round(n);
            return d ? r / m : r;
        },
        guid: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        public_function2: function () {
        }
    }
})();


hebeutils.init();
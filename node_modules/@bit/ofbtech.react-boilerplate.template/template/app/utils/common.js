import dateFormat from 'dateformat';
import crypto from 'crypto';
import Common from './constants';

export default class Utils {
    static getThumbS3Key(s3key) {
        if (this.isUndefinedOrNullOrEmpty(s3key)) {
            throw new Error('arg s3key is required');
        }

        const lastIndex = s3key.lastIndexOf('.');
        return `${s3key.substring(0, lastIndex)}_thumb${s3key.substring(lastIndex)}`;
    }

    static uniqueArray(arr) {
        const result = [];
        if (Utils.isUndefinedOrNullOrEmptyList(arr)) {
            return result;
        }
        for (let i = 0; i < arr.length; i += 1) {
            if (result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    static isNumber(value) {
        return typeof value === 'number';
    }

    static isFunction(value) {
        return typeof value === 'function';
    }

    static isUndefined(value) {
        return typeof value === 'undefined';
    }

    static isNull(value) {
        return value === null;
    }

    static isEmpty(value) {
        return value === '';
    }

    static isEmptyList(value) {
        return value.constructor === Array && value.length === 0;
    }

    static isEmptyObject(value) {
        if (value === null) {
            return true;
        }

        if (Utils.isBoolean(value) || Utils.isNumber(value) || Utils.isFunction(value)) {
            return false;
        }

        if (value instanceof Set && !Utils.isUndefined(value.size) && value.size !== 0) {
            return false;
        }

        return Object.keys(value).length === 0;
    }

    static isStringAndNotEmpty(value) {
        return typeof value === 'string' && value !== '';
    }

    static isObject(value) {
        if (
            Utils.isUndefinedOrNullOrEmpty(value) ||
            Utils.isString(value) ||
            Array.isArray(value) ||
            Utils.isBoolean(value) ||
            Utils.isNumber(value) ||
            Utils.isFunction(value)
        ) {
            return false;
        }

        if (value instanceof Set && !Utils.isUndefined(value.size) && value.size !== 0) {
            return true;
        }

        return Object.keys(value).length !== 0;
    }

    static isString(value) {
        return typeof value === 'string';
    }

    static isUndefinedOrNull(value) {
        return Utils.isUndefined(value) || Utils.isNull(value);
    }

    static isUndefinedOrNullOrEmpty(value) {
        return Utils.isUndefinedOrNull(value) || Utils.isEmpty(value);
    }

    static isUndefinedOrNullOrEmptyObject(value) {
        return Utils.isUndefinedOrNullOrEmpty(value) || Utils.isEmptyObject(value);
    }

    static isUndefinedOrNullOrEmptyList(value) {
        return Utils.isUndefinedOrNull(value) || Utils.isEmptyList(value);
    }

    static isUndefinedOrNullOrEmptyOrEmptyObjectOrEmptyList(value) {
        return Utils.isUndefinedOrNullOrEmpty(value) || Utils.isEmptyObject(value) || Utils.isUndefinedOrNullOrEmptyList(value);
    }

    static copy(value) {
        return { ...value };
    }

    static deepCopy(value) {
        return JSON.parse(JSON.stringify(value));
    }

    static isUrlMatched(originalUrl, url) {
        let newUrl = originalUrl.split('?')[0];
        [newUrl] = originalUrl.split('#');
        if (newUrl === url) {
            return true;
        }
        return false;
    }

    static refactorQueryPageNumber(param) {
        const newParam = Utils.copy(param);
        if (!Utils.isUndefinedOrNull(newParam.pageNumber)) {
            newParam.pageNumber -= 1;
        }
        return newParam;
    }

    static makeQueryString(params) {
        if (this.isUndefinedOrNullOrEmptyObject(params)) {
            return '';
        }
        const query = [];
        Object.keys(params).forEach(index => {
            if (!this.isUndefinedOrNullOrEmpty(params[index]) && typeof params[index] === 'object') {
                const filters = params[index];
                Object.keys(filters).forEach(key => {
                    if (filters[key] instanceof Array) {
                        query.push(`${index}=${key}:${filters[key].join('|')}`);
                    }
                });
            } else if (!this.isUndefinedOrNullOrEmpty(params[index])) {
                query.push(`${index}=${params[index]}`);
            }
        });
        return query.join('&');
    }

    static makeQueryFilter(queryString) {
        const params = {};
        let query = queryString;
        if (query.charAt(0) === '?') {
            query = query.substr(1);
        }
        if (!this.isStringAndNotEmpty(query)) {
            return params;
        }
        const obj = query.split('&');
        Object.keys(obj).forEach(index => {
            const option = obj[index].split('=');
            const paramName = option[0];
            const paramValue = option[1];
            if (Object.prototype.hasOwnProperty.call(params, paramName)) {
                if (this.isStringAndNotEmpty(params[paramName])) {
                    const temp = params[paramName].split(':');
                    const keyName = temp[0];
                    const keyValue = temp[1];
                    params[paramName] = {};
                    params[paramName][keyName] = keyValue.split('|');
                    const newValue = paramValue.split(':');
                    params[paramName][newValue[0]] = newValue[1].split('|');
                } else {
                    const temp = params[paramName];
                    const newValue = paramValue.split(':');
                    temp[newValue[0]] = newValue[1].split('|');
                    params[paramName] = temp;
                }
            } else {
                params[paramName] = paramValue;
            }
        });
        return params;
    }

    static findGetParameter(parameterName) {
        let result = null;
        let tmp = [];
        const items = window.location.search.substr(1).split('&');
        for (let index = 0; index < items.length; index += 1) {
            tmp = items[index].split('=');
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }

    static formatCurrency(number, addRupeeSymbol) {
        if (this.isUndefinedOrNullOrEmpty(number)) {
            return number;
        }
        try {
            return (addRupeeSymbol ? '₹ ' : '') + number.toLocaleString('en-IN');
        } catch (error) {
            throw new Error(error);
        }
    }

    static formatCurrencyFromString(numberString) {
        if (Number.isNaN(numberString)) {
            return numberString;
        }
        if (this.isUndefinedOrNullOrEmpty(numberString)) {
            return numberString;
        }
        if (Number(numberString) === 0) {
            return numberString;
        }
        let afterPoint = '';
        let x = numberString;
        if (x.indexOf('.') > 0) {
            afterPoint = x.substring(x.indexOf('.'), x.length);
        }
        x = Math.floor(x);
        x = x.toString();
        let lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '') {
            lastThree = `,${lastThree}`;
        }
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
    }

    static modulus(number) {
        return number % 1;
    }

    static convertNumber(num) {
        let number = num;
        if (number < 0 || number > 999999999) {
            return 'NUMBER OUT OF RANGE!';
        }
        const Gn = Math.floor(number / 10000000); /* Crore */
        number -= Gn * 10000000;
        const kn = Math.floor(number / 100000); /* lakhs */
        number -= kn * 100000;
        const Hn = Math.floor(number / 1000); /* thousand */
        number -= Hn * 1000;
        const Dn = Math.floor(number / 100); /* Tens (deca) */
        number %= 100; /* Ones */
        const tn = Math.floor(number / 10);
        const one = Math.floor(number % 10);
        let res = '';

        if (Gn > 0) {
            res += `${this.convertNumber(Gn)} CRORE`;
        }
        if (kn > 0) {
            res += `${(res === '' ? '' : ' ') + this.convertNumber(kn)} LAKH`;
        }
        if (Hn > 0) {
            res += `${(res === '' ? '' : ' ') + this.convertNumber(Hn)} THOUSAND`;
        }
        if (Dn) {
            res += `${(res === '' ? '' : ' ') + this.convertNumber(Dn)} HUNDRED`;
        }

        const ones = [
            '',
            'ONE',
            'TWO',
            'THREE',
            'FOUR',
            'FIVE',
            'SIX',
            'SEVEN',
            'EIGHT',
            'NINE',
            'TEN',
            'ELEVEN',
            'TWELVE',
            'THIRTEEN',
            'FOURTEEN',
            'FIFTEEN',
            'SIXTEEN',
            'SEVENTEEN',
            'EIGHTEEN',
            'NINETEEN',
        ];
        const tens = ['', '', 'TWENTY', 'THIRTY', 'FOURTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

        if (tn > 0 || one > 0) {
            if (!(res === '')) {
                res += ' AND ';
            }
            if (tn < 2) {
                res += ones[tn * 10 + one];
            } else {
                res += tens[tn];
                if (one > 0) {
                    res += `-${ones[one]}`;
                }
            }
        }

        if (res === '') {
            res = 'zero';
        }
        return res;
    }

    static formatCurrencyToWords(number) {
        try {
            const fraction = Math.round(this.modulus(number) * 100);
            let fText = '';

            if (fraction > 0) {
                fText = `AND ${this.convertNumber(fraction)} PAISE`;
            }

            return `${this.convertNumber(number)} RUPEE ${fText} ONLY`;
        } catch (error) {
            throw new Error(error);
        }
    }

    static formatDate(dateLong, format) {
        if (Utils.isUndefinedOrNull(dateLong) || dateLong === 0) {
            return '-';
        }
        const newFormat = format || 'dd mmm yyyy';
        const date = new Date(dateLong);
        return dateFormat(date, newFormat);
    }

    static formatDateAndTime(dateLong, format) {
        const newFormat = format || 'dd mmm yyyy h:MM TT';
        return this.formatDate(dateLong, newFormat);
    }

    static getUniqueList(list) {
        const newList = [];
        for (let i = 0; i < list.length; i += 1) {
            if (newList.indexOf(list[i]) === -1) {
                newList.push(list[i]);
            }
        }
        return newList;
    }

    static getErrorMessage(error, defaultMessage) {
        const message = defaultMessage || 'Server is unavailable.';
        if (!Utils.isUndefinedOrNullOrEmpty(error.responseText)) {
            return JSON.parse(error.responseText).errorMessage;
        }
        return message;
    }

    static getNestedValue(obj, keyString) {
        if (obj !== Object(obj) || Utils.isUndefinedOrNullOrEmpty(keyString)) {
            return null;
        }
        const keys = keyString.split('.');
        let currObj = obj[keys.shift()];
        while (currObj && keys.length) currObj = currObj[keys.shift()];
        return currObj;
    }

    static getStringOrHyphen(input) {
        if (input) {
            return input;
        }
        return '-';
    }

    static getCdnUrl(url) {
        const cdnUrl = '{_imgCdnUrl}';
        if (!Utils.isUndefinedOrNullOrEmpty(url)) {
            return cdnUrl + url;
        }
        return '';
    }

    static fromNow(date) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = date;
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
        if (diffDays === 1) {
            return `${diffDays} day ago`;
        }
        return `${diffDays} days ago`;
    }

    static getCompletedApplicationStep(application, pdform) {
        if (this.isUndefinedOrNullOrEmpty(application)) {
            return 0;
        }
        let step1Complete = true;
        if (
            application.loanAmount <= 0 ||
            this.isUndefinedOrNullOrEmpty(application.client.name) ||
            this.isUndefinedOrNullOrEmpty(application.contactPersonName) ||
            this.isUndefinedOrNullOrEmpty(application.contactPersonMobile)
        ) {
            step1Complete = false;
        }
        let step2Complete = true;
        if (
            this.isUndefinedOrNullOrEmpty(application.client.entityType) ||
            this.isUndefinedOrNullOrEmpty(application.client.pan) ||
            this.isUndefinedOrNullOrEmptyObject(application.client.officeAddress) ||
            this.isUndefinedOrNullOrEmpty(application.client.officeAddress.addressLine1) ||
            this.isUndefinedOrNullOrEmpty(application.client.officeAddress.city) ||
            this.isUndefinedOrNullOrEmpty(application.client.officeAddress.state) ||
            this.isUndefinedOrNullOrEmpty(application.client.officeAddress.pinCode) ||
            this.isUndefinedOrNullOrEmptyList(application.client.promoters) ||
            this.isUndefinedOrNullOrEmptyObject(application.client.promoters[0]) ||
            this.isUndefinedOrNullOrEmpty(application.client.promoters[0].name)
        ) {
            step2Complete = false;
        }
        let pdStepComplete = true;
        if (this.isUndefinedOrNullOrEmpty(pdform && pdform.answers)) {
            pdStepComplete = false;
        }
        if (step1Complete) {
            if (step2Complete) {
                if (pdStepComplete) {
                    return 3;
                }
                return 2;
            }
            return 1;
        }
        return 0;
    }

    static parallel(tasks, callback) {
        if (Array.isArray(tasks)) {
            const totalNumberOfTasks = tasks.length;
            if (totalNumberOfTasks <= 0) {
                throw new Error('Empty task array passed to parallel');
            }
            let taskCompletedCount = 0;
            const results = [];
            tasks.forEach((task, index) => {
                task((...args) => {
                    const err = args.length <= 0 ? new Error(`No callback arguments passed for task number ${index + 1}`) : args[0];
                    if (err) {
                        callback(err);
                    }
                    args.shift(); // removes first element
                    let result; // result undefined if no more arguments left
                    if (args.length === 1) {
                        [result] = args; // result single value
                    } else if (args.length > 1) {
                        result = args; // result multiple values
                    }
                    results[index] = result;
                    taskCompletedCount += 1;
                    if (taskCompletedCount === totalNumberOfTasks) {
                        callback(null, results);
                    }
                });
            });
        } else {
            const keys = Object.keys(tasks);
            const totalNumberOfTasks = keys.length;
            if (keys.length <= 0) {
                throw new Error('Empty task object passed to parallel');
            }
            let taskCompletedCount = 0;
            const results = {};
            keys.forEach((key, index) => {
                tasks[key]((...args) => {
                    const err = args.length <= 0 ? new Error(`No callback arguments passed for task number ${index + 1}`) : args[0];
                    if (err) {
                        callback(err);
                    }
                    args.shift(); // removes first element
                    let result; // result undefined if no more arguments left
                    if (args.length === 1) {
                        [result] = args; // result single value
                    } else if (args.length > 1) {
                        result = args; // result multiple values
                    }
                    results[key] = result;
                    taskCompletedCount += 1;
                    if (taskCompletedCount === totalNumberOfTasks) {
                        callback(null, results);
                    }
                });
            });
        }
    }

    static objToQueryString(obj) {
        if (this.isUndefinedOrNullOrEmptyObject(obj)) {
            return null;
        }
        const str = [];
        Object.keys(obj).map(p => {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
                if (!Utils.isUndefinedOrNull(obj[p])) {
                    if (Object.prototype.toString.call(obj[p]) === '[object Array]') {
                        for (let i = 0; i < obj[p].length; i += 1) {
                            str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p][i])}`);
                        }
                    } else if (typeof obj[p] === 'string' || typeof obj[p] === 'number' || typeof obj[p] === 'boolean') {
                        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p].toString())}`);
                    }
                }
            }
            return str;
        });

        return str.join('&');
    }

    static capitalizeByWords(input) {
        if (Utils.isUndefinedOrNullOrEmpty(input)) {
            return input;
        }
        let cap = '';
        const inputTokens = input.split('_');
        for (let num = 0; num < inputTokens.length - 1; num += 1) {
            cap = cap.concat(Utils.capitalize(inputTokens[num]));
            cap = cap.concat(' ');
        }
        cap = cap.concat(Utils.capitalize(inputTokens[inputTokens.length - 1]));
        return cap;
    }

    static capitalize(input) {
        if (Utils.isUndefinedOrNullOrEmpty(input)) {
            return input;
        }
        let cap = '';
        const inputTokens = input.split(' ');
        for (let num = 0; num < inputTokens.length; num += 1) {
            cap = cap + inputTokens[num].substring(0, 1).toUpperCase() + inputTokens[num].substring(1).toLowerCase();
            if (num !== inputTokens.length - 1) {
                cap += ' ';
            }
        }
        return cap;
    }

    static handleCaret(key) {
        if (!Utils.isUndefinedOrNullOrEmpty(key)) {
            const index = key.indexOf('^');
            if (index > -1) {
                const keyPrefix = key.slice(0, index);
                const keySuffix = key.slice(index + 1, index + 2);
                const keyEnd = key.slice(index + 2);
                return `${keyPrefix}<sup>${keySuffix}</sup>${keyEnd}`;
            }
        }
        return key;
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    static numberToOrdinalSuffix(i) {
        const j = i % 10;
        const k = i % 100;
        if (j === 1 && k !== 11) {
            return `${i}st`;
        }
        if (j === 2 && k !== 12) {
            return `${i}nd`;
        }
        if (j === 3 && k !== 13) {
            return `${i}rd`;
        }
        return `${i}th`;
    }

    static swapElement(array, indexA, indexB) {
        const newList = this.deepCopy(array);
        newList[indexA] = array[indexB];
        newList[indexB] = array[indexA];
        return newList;
    }

    static timeToExpiryBy(futureTime) {
        if (!futureTime) return null;
        const millis = +futureTime - Date.now();
        let isExpired = false;
        const time = [];
        if (millis < 0) isExpired = true;

        // get total seconds between the times
        let delta = Math.abs(millis) / 1000;

        // calculate (and subtract) whole days
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        if (days) time.push(`${days} day${days > 1 ? 's' : ''}`);

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        if (hours) time.push(`${hours} hr${hours > 1 ? 's' : ''}`);

        // calculate (and subtract) whole minutes
        if (!days) {
            const minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            if (minutes) time.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
        }

        return { isExpired, timeString: time.join(', ') };
    }

    static getNAWhenValueZero(value) {
        return value === 0 ? '-' : value;
    }

    static preventClickAndOpenInNewIfCmd(e) {
        if ((e.ctrlKey || e.metaKey) && !(e.ctrlKey && e.metaKey)) {
            return true;
        }
        e.preventDefault();
        return false;
    }

    static getFileExtension(fileName) {
        if (this.isUndefinedOrNullOrEmpty(fileName)) {
            return null;
        }
        return fileName.split('.').reverse()[0];
    }

    static viewableImageFormats(extension) {
        const formats = ['jpg', 'JPEG', 'jpeg', 'png', 'svg', 'gif', 'TIFF', 'bmp'];
        return formats.indexOf(extension) !== -1;
    }

    static getUniqueId() {
        const pad = '0000000';
        const uniqueIdStr = Math.floor(Math.random() * 10000000).toString();
        return `${new Date().getTime()}X${pad.substring(0, pad.length - uniqueIdStr.length)}${uniqueIdStr}`;
    }

    static getSlug(str) {
        if (this.isUndefinedOrNullOrEmpty(str)) {
            return null;
        }
        return str.replace(/ /g, '-');
    }

    static getTrimmedString(str, length) {
        if (this.isUndefinedOrNullOrEmpty(length)) {
            return str;
        }
        if (str.length > length) {
            return `${str.substr(0, length)}...`;
        }
        return str;
    }

    static getCamelCased(str) {
        if (this.isUndefinedOrNullOrEmpty(str)) {
            return null;
        }
        return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    }

    static shareIt(shareUrl) {
        if (typeof window === 'undefined') {
            return;
        }
        const sTop = window.screen.height / 2 - 218;
        const sLeft = window.screen.width / 2 - 313;
        window.open(shareUrl, 'sharer', `toolbar=0, status=0, width=626, height=256, top=${sTop}, left=${sLeft}`);
    }

    static convertCurrencyNumerals(n) {
        if (this.isUndefinedOrNullOrEmpty(n)) {
            return null;
        }
        const num = Math.abs(Number(this.replaceString(n, ',', '')));
        const roundToOne = val => (val.toString().indexOf('.') > -1 ? val.toString().substr(0, val.toString().indexOf('.') + 2) : val);
        if (Number.isNaN(num)) {
            return '-';
        }
        if (num >= 1e7) {
            return `${roundToOne(num / 1e7)} Cr`;
        }
        if (num >= 1e5) {
            return `${roundToOne(num / 1e5)} L`;
        }
        if (num >= 1e3) {
            return `${roundToOne(num / 1e3)} K`;
        }
        return num;
    }

    static replaceString(val, str, newStr) {
        if (this.isUndefinedOrNullOrEmpty(val) || this.isUndefinedOrNull(str) || Number(val) === 0) {
            return val;
        }
        // if (Number(val) === 0 || Number.isNaN(Number(val))) {
        //     return val;
        // }
        const newString = this.isUndefinedOrNull(newStr) ? '' : newStr;
        return val.replace(new RegExp(str, 'g'), newString);
    }

    static getQueryParamsFromUrl(url) {
        if (this.isUndefinedOrNullOrEmpty(url)) {
            return {};
        }
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        const params = {};
        let match = null;
        do {
            match = regex.exec(url);
            if (!this.isUndefinedOrNull(match)) {
                const [, b, c] = match;
                params[b] = c;
            }
        } while (match != null);
        return params;
    }

    static isStringHasOnlyNumber(n) {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }

    static getRoundOfValue(value, roundOf) {
        if (this.isUndefinedOrNullOrEmpty(value)) {
            return null;
        }
        return Number(value).toFixed(roundOf);
    }

    static updateLoginPath(step) {
        if (this.isUndefinedOrNullOrEmptyObject(step)) {
            return;
        }

        if (typeof window === 'undefined') {
            return;
        }

        const url = new URL(window.location.toString());
        url.hash = `#${step.path}`;
        const newUrl = url.toString();
        window.location = newUrl;
    }

    static pushUrlInHistory(url) {
        if (typeof window !== 'undefined') {
            if (window.history.pushState) {
                window.history.pushState({ path: url }, '', url);
            }
        }
    }

    static isMSite(pageInfo) {
        if (this.isUndefinedOrNullOrEmptyObject(pageInfo)) {
            return false;
        }

        return pageInfo && pageInfo.platform === Common.PLATFORM.M_SITE;
    }

    static goBackInHistory() {
        if (typeof window !== 'undefined') {
            if (window.history.back) {
                window.history.back();
            }
        }
    }

    static replaceStringToNumber(val) {
        const newVal = val;
        if (this.isUndefinedOrNullOrEmpty(val) || Number(val) === 0 || newVal.toString().indexOf(',') === -1) {
            return Number(val);
        }
        return Number(this.replaceString(val, ',', ''));
    }

    static getHasSha(input) {
        const hash = crypto.createHash('sha512');
        hash.update(input);
        const value = hash.digest('hex');
        return value;
    }

    static setHostUrl(pageInfo, url) {
        const { protocol, host } = pageInfo;
        if (host === 'localhost') {
            return `${protocol}://${host}:9000/${url}`;
        }
        return `${protocol}://${host}/${url}`;
    }

    static getDateDiff(d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const oneDay = 24 * 3600 * 1000; // one day
        const diffDays = parseInt((date2 - date1) / oneDay, 10);

        return diffDays;
    }

    static toTitleCase(str) {
        if (this.isUndefinedOrNullOrEmpty(str)) {
            return '';
        }
        if (str.length === 1) {
            return str.toUpperCase();
        }
        const newStr = str.charAt(0).toUpperCase() + str.slice(1);
        return newStr;
    }

    static formatPhoneNumber(mobile) {
        if (!mobile) {
            return mobile;
        }

        const tempArr = mobile.split('');
        // if (this.isUndefinedOrNullOrEmpty(mobile) || (tempArr.length !== 13 && tempArr.length !== 12)) {
        if (this.isUndefinedOrNullOrEmpty(mobile)) {
            return mobile;
        }
        let newStr = '';
        if (tempArr.length === 13) {
            for (let i = 0; i < tempArr.length; i += 1) {
                newStr += tempArr[i];
                if (i === 2 || i === 6 || i === 9) {
                    newStr += ' ';
                }
            }
        }
        if (tempArr.length === 12) {
            for (let i = 0; i < tempArr.length; i += 1) {
                newStr += tempArr[i];
                if (i === 1 || i === 5 || i === 8) {
                    newStr += ' ';
                }
            }
            newStr = `+${newStr}`;
        }
        return newStr;
    }

    static getTenDigitMobile(mobile) {
        if (!mobile) {
            return mobile;
        }

        return mobile.substr(mobile.length - 10);
    }

    static getNameByKey(obj, filterKey) {
        const array = [];
        let filterName = '';
        Object.keys(obj).forEach(item => {
            if (!Utils.isEmptyList(obj[item])) {
                array.push(...obj[item]);
            }
        });
        array.forEach(item => {
            if (item.key === filterKey) {
                filterName = item.name;
            }
        });
        return filterName;
    }

    static getDomain(pageInfo) {
        if (this.isUndefinedOrNullOrEmptyObject(pageInfo)) {
            return null;
        }
        return pageInfo.domain;
    }

    static getQueryParams(queryStr) {
        if (Utils.isUndefinedOrNullOrEmpty(queryStr)) {
            return {};
        }
        const params = {};
        const queryParamsStr = queryStr.split('?')[1];
        const queryParamsArr = queryParamsStr.split('&');
        queryParamsArr.forEach(item => {
            const tempItem = item.split('=');
            const itemKey = tempItem[0];
            const itemValue = tempItem[1];
            params[itemKey] = itemValue;
        });

        return params;
    }

    static makeCommaStrFromObj(dataItem) {
        let commaStr = '';
        if (Utils.isUndefinedOrNullOrEmptyObject(dataItem)) {
            return '-';
        }
        const totalLength = Object.keys(dataItem).length;
        Object.keys(dataItem).map(key => {
            commaStr += this.capitalizeByWords(dataItem[key].name);
            if (Number(key) < totalLength && Number(key) !== totalLength - 1) {
                commaStr += ', ';
            }
            return commaStr;
        });
        return commaStr || '-';
    }

    static makeCommaStrFromList(dataItem) {
        let commaStr = '';
        if (Utils.isUndefinedOrNullOrEmptyList(dataItem)) {
            return '-';
        }

        for (let i = 0; i < dataItem.length; i += 1) {
            commaStr += this.capitalizeByWords(dataItem[i]);
            if (i < dataItem.length && i !== dataItem.length - 1) {
                commaStr += ', ';
            }
        }
        return commaStr || '-';
    }

    static getQueryParamByKey(search, key) {
        if (Utils.isUndefinedOrNullOrEmpty(search)) {
            return '';
        }
        if (search.indexOf(key) === -1) {
            return '';
        }

        const params = {};
        const queryParamsStr = search.split('?')[1];
        const queryParamsArr = queryParamsStr.split('&');
        queryParamsArr.forEach(item => {
            const tempItem = item.split('=');
            const itemKey = tempItem[0];
            const itemValue = tempItem[1];
            params[itemKey] = itemValue;
        });

        return params[key];
    }
}

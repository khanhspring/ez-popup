"use strict";
exports.__esModule = true;
exports.generateString = exports.randomId = void 0;
var CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function randomId() {
    var date = new Date();
    return date.getTime + generateString(5);
}
exports.randomId = randomId;
function generateString(length) {
    if (length === void 0) { length = 10; }
    var result = '';
    var charactersLength = CHARACTERS.length;
    for (var i = 0; i < length; i++) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.generateString = generateString;
//# sourceMappingURL=random-util.js.map
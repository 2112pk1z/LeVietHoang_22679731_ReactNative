"use strict";
function getNumber() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(10);
        }, 1000);
    });
}
getNumber().then(function (result) {
    console.log(result);
});

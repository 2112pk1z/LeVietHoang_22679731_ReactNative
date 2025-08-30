"use strict";
function getError() {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject("Something went wrong");
        }, 1000);
    });
}
getError().catch(function (error) {
    console.log(error);
});

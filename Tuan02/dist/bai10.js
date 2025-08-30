"use strict";
const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
        if (success) {
            resolve("Promise resolved!");
        }
        else {
            reject("Promise rejected!");
        }
    }, 1000);
});
myPromise
    .then(result => {
    console.log(result);
})
    .catch(error => {
    console.error(error);
})
    .finally(() => {
    console.log("Done");
});

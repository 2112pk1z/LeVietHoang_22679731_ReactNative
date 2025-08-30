"use strict";
async function demoForAwait() {
    const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
    ];
    for await (const value of promises) {
        console.log(value);
    }
}
demoForAwait();

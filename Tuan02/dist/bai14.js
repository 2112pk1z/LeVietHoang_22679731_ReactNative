"use strict";
async function multiplyByThree(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
}
async function run14() {
    const result = await multiplyByThree(5);
    console.log(result);
}
run14();

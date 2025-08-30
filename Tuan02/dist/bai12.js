"use strict";
function simulateTask3(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task finished after ${ms} ms`);
        }, ms);
    });
}
async function runTask() {
    const result = await simulateTask3(2000);
    console.log(result);
}
runTask();

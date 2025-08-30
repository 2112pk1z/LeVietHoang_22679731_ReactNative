"use strict";
function simulateTask13(ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject("Task failed");
            }
            else {
                resolve("Task done");
            }
        }, ms);
    });
}
async function runTask13() {
    try {
        const result = await simulateTask13(1000, true);
        console.log(result);
    }
    catch (error) {
        console.log("Error:", error);
    }
}
runTask13();

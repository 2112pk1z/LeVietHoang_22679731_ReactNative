"use strict";
function simulateTask2(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done in " + time + " ms");
        }, time);
    });
}
Promise.all([
    simulateTask2(1000),
    simulateTask2(2000),
    simulateTask2(1500)
]).then((message) => {
    console.log(message);
});

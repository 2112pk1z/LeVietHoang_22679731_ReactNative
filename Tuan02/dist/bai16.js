"use strict";
async function doubleAfter1Sec(num) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 1000);
    });
}
async function runInParallel() {
    const results = await Promise.all([
        doubleAfter1Sec(2),
        doubleAfter1Sec(4),
        doubleAfter1Sec(6),
    ]);
    console.log("Kết quả:", results);
}
runInParallel();

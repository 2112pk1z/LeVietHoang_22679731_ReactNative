"use strict";
const numbers = [1, 2, 3, 4, 5, 6];
const filterEvenNumbers = new Promise((resolve) => {
    setTimeout(() => {
        const evens = numbers.filter(n => n % 2 === 0);
        resolve(evens);
    }, 1000);
});
filterEvenNumbers.then(result => {
    console.log("Even numbers:", result);
});

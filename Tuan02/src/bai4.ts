function getRandomNumber() {
  return new Promise(function(resolve, reject) {
    const num = Math.random();
    if (num > 0.5) {
      resolve(num); 
    } else {
      reject("Number too small: " + num); 
    }
  });
}

getRandomNumber()
  .then(function(result) {
    console.log("Success! Random number:", result);
  })
  .catch(function(error) {
    console.log("Error:", error);
  });

let promise = new Promise(function(resolve) {
  setTimeout(function() {
    resolve("Hello Async");
  }, 2000);
});

promise.then(function(result) {
  console.log(result); 
});

function task(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task done in " + ms + " ms"));
  });
}

Promise.race([
  task(1000),
  task(2000),
  task(1500)
]).then(result => {
  console.log("Fastest Promise:", result);
});

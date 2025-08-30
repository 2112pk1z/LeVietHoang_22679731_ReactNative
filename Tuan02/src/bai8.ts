Promise.resolve(2)
  .then(num => {
    console.log("Start:", num);
    return num * num;
  })
  .then(num => {
    console.log("After square:", num);
    return num * 2;
  })
  .then(num => {
    console.log("After double:", num);
    return num + 5;
  })
  .then(result => {
    console.log("Final result:", result);
  });
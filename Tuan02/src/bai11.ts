function delayedHello(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

async function run() {
  const message = await delayedHello();
  console.log(message);
}

run();
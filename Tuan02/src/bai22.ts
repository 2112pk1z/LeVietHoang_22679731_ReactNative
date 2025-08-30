async function getDatas() {
  try {
    for (let i = 1; i <= 3; i++) {
      let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
      let data = await response.json();
      console.log(`Data ${i}:`, data);
    }
  } catch (error) {
    console.error("Có lỗi:", error);
  }
}

getDatas();
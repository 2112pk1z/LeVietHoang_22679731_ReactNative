async function fetchUser(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "User " + id });
    }, 1000);
  });
}

async function run18() {
  const user = await fetchUser(1);
  console.log(user);
}

run18();
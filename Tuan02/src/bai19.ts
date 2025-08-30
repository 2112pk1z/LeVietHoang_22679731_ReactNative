async function fetchUser19(id: number) {
  return new Promise<{ id: number; name: string }>((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "User " + id });
    }, 1000); 
  });
}

async function fetchUsers(ids: number[]) {
  const promises = ids.map((id) => fetchUser19(id));
  const users = await Promise.all(promises);
  return users;
}

async function run19() {
  const users = await fetchUsers([1, 2, 3, 4]);
  console.log(users);
}

run19();

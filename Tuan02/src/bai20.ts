async function fetchUser20(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` });
    }, 3000);
  });
}

async function fetchUserWithTimeout(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timeout: API call took too long"));
    }, 2000);

    fetchUser20(id).then(user => {
      clearTimeout(timer);
      resolve(user);
    }).catch(reject);
  });
}

(async () => {
  try {
    const user = await fetchUserWithTimeout(1);
    console.log("Got user:", user);
  } catch (err) {
    console.error("Error:", err);
  }
})();

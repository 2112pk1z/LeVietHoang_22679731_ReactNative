"use strict";
async function fetchUser19(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: "User " + id });
        }, 1000);
    });
}
async function fetchUsers(ids) {
    const promises = ids.map((id) => fetchUser19(id));
    const users = await Promise.all(promises);
    return users;
}
async function run19() {
    const users = await fetchUsers([1, 2, 3, 4]);
    console.log(users);
}
run19();

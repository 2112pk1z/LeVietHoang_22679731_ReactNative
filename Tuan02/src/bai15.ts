async function multiplyByTwo(num: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
}

async function runSequential() {
    const result1 = await multiplyByTwo(2);
    console.log("Kết quả 1:", result1);

    const result2 = await multiplyByTwo(4);
    console.log("Kết quả 2:", result2);

    const result3 = await multiplyByTwo(6);
    console.log("Kết quả 3:", result3);
}

runSequential();

async function bar() {
    console.log(2222222)

    return new Promise((resolve) => {
        resolve()
    })
}

async function foo() {
    console.log(1111111)

    await bar()

    console.log(33333333)
}

foo() 

console.log(444444444)
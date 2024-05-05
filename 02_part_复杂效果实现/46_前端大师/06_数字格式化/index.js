const str = '10000000000'   // 10,000,000,000

const s = str.replace(/(?=(\d{3})+$)/g, ',')
console.log('s', s)

const number = 100000000000
console.log('number', number.toLocaleString('de-DE'), number)
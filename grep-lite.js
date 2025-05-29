// node grep-lite.js --file=text.txt --search=hello
const fs = require('fs')

const rawArgs = process.argv

const checkArgs = rawArgs.filter(e => e.includes('--file') || e.includes('--search'))

if (checkArgs.length < 2) {
  console.log('[ERROR]: Usage: node grep-lite.js --file=<path> --search=<string>')
  process.exit(1)
}

const args = Object.assign({}, ...rawArgs.slice(2).map(e => e.split('--')[1].split('=')).map(e => ({ [e[0]]: e[1] })))

try {
  
} catch {

}

console.log(args.ignore_case)

try {
  fs.openSync(args.file)
} catch(err) {
  if (err.errno === -4058) {
    console.log(`[ERROR]: File not found`)
    process.exit(1)
  }
}

const file = fs.readFileSync(args.file, 'utf-8').split('\n').filter(e => e.trim() !== '')
// console.log(file)

file.map((e, i) => {
  // console.log(i, e)
  if (e.includes(args.search)) {
    // console.log(`[Line: ${i}]: ${e}`)
  }
})

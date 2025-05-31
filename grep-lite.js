//  node grep-lite.js --file="text.txt, file.txt"  --search=man --ignore-case=true


const fs = require('fs')
// const path = require('path')

const rawArgs = process.argv

const checkArgs = rawArgs.filter(e => e.includes('--file') || e.includes('--search'))

if (checkArgs.length < 2) {
  console.log('[ERROR]: Usage: node grep-lite.js --file=<path> --search=<string>')
  process.exit(1)
}

const args = Object.assign({}, ...rawArgs.slice(2).map(e => e.split('--')[1].split('=')).map(e => ({ [e[0]]: e[1] })))
const [fileNames, search, ignoreCase] = [args.file.split(',').map(e => e.trim()), args.search, args["ignore-case"] === "true"]
// console.log(fileNames, search, ignoreCase)

// console.log(args)
// console.log(fileNames)

const files = fileNames.map(file => {
  try {
    return {name: file, data: fs.readFileSync(file, 'utf-8').split('\n')}
  } catch(err) {
    if (err.errno === -4058) {
      console.log(`[ERROR]: File not found`)
      process.exit(1)
    }
  }
})

// console.log(`${path.resolve(__dirname, 'text.txt')}, ${path.resolve(__dirname, 'file.txt')}`)
// console.log(files)

const regex = new RegExp(args.search, ignoreCase ? 'gi' : 'g')

files.forEach(file => {
  // console.log(file.data, file.name)
  console.log(`\x1b[46m----[FILE]: ${file.name} -----\x1b[0m`)
  
  file.data.forEach((e, i) => {
    if (regex.test(e)) {
      const word = e.replace(regex, match => `\x1b[35m${match}\x1b[0m`)
      console.log(`[Line: ${i + 1}]: ${word}`)
    }
  })
})

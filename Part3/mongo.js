
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.l3wi6dm.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

// if node command line prompt is === 3 characters show entire phonebook
if (process.argv.length === 3) {
  console.log('phonebook:')

  Person.find({}).then(result => {
    result.forEach(results => {
      console.log(`${results.name} ${results.number}`)
    })
    mongoose.connection.close()
  })

  // if node command line prompt is == 5 characters, save entry
  //where [3] is the name and [4] is the number

} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  // Save, print result, close connection.
  person.save().then(() => {
    console.log(`Added ${name} number: ${number} to phonebook`)
    return mongoose.connection.close()
  })

    .catch((err) => console.log(err))
}

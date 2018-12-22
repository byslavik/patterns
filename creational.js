// Constructor
// es5
function Task (title, description) {
  this.title = title;
  this.description = description;
  this.status = 0
}

Task.prototype.resolve = function () {
  this.status = 1
}

const task1 = new Task('Title', 'Description')
task1.resolve()

// es6
class Task {
  constructor({ title, description }) {
    this.title = title;
    this.description = description;
    this.status = 0
  }
  
  resolve() {
    this.status = 1
  }
}

const task2 = new Task({
  title: 'Title1',
  description: 'Description1'
})

task2.resolve()


// Module

const myModule = (function() {
  // private var
  const privateVar = 1
  // public var
  const valueToSend = privateVar + 2

  // public method
  const myPublicMethod = () => valueToSend

  return {
    myPublicMethod
  }
})()

// Factory
const PORSCHE = 'Porsche'
const BMW = 'Bmw'
const BASE_MODEL = 'Base'

class Porsche {
  constructor({ model }) {
    this.make = PORSCHE
    this.horse = 550
    this.model = model
    this.isSwitchedOn = false
  }
}

class Bmw {
  constructor({ model }) {
    this.make = BMW
    this.horse = 250
    this.model = model
    this.isSwitchedOn = false
  }
}

const CARTYPE_MAPPING = {
  [PORSCHE]: Porsche,
  [BMW]: Bmw
}

class Car {
  createCar({ make = PORSHE, model = BASE_MODEL } = {}) {
    this.carType = CARTYPE_MAPPING[make]

    return new this.carType({ model })
  }
}

const car = new Car()

const bmw = car.createCar({ make: BMW })

// Singleton
let instance = null

class PrivateUser {
  constructor() {
    if (instance) {
      return instance
    }

    this.name = 'My private user'
    instance = this
  }
}

const user1 = new PrivateUser()
const user2 = new PrivateUser()

// user1 === user2 - true

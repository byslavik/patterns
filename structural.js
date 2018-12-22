// Decorator

class Car {
  constructor(name, speed) {
    this.speed = speed
    this.name = name
  }
  getSpeed() {
    return this.speed
  }
}

const withIncreasedSpeed = car => {
  const speed = car.getSpeed()

  car.getSpeed = () => speed + 1
}

const bmw = new Car('Bmw', 120)
bmw.getSpeed()
withIncreasedSpeed(bmw)
bmw.getSpeed()


// Facade
const NORMAL_MASLOJOR = 1000
const NORMAL_TIRE = 4000
const NO_OIL = 'There is no oil, please check'
const NO_TIRE = 'There is no tire, please check'

class Oil {
  constructor(amount){
    this.amount = amount
    this.status = true
    this.error = ''
  }
  checkStatus(oilAmount) {
    return oilAmount > 0
  }
  passKm(km){
    const newAmount = this.amount - km/NORMAL_MASLOJOR
    if(!this.checkStatus(newAmount)) {
      this.error = NO_OIL
      this.status = false
    } else {
      this.amount = newAmount
    }
    return this
  }

  inspection(init) {
    this.amount = init
    this.status = true
    this.error = ''
  }
}

class Tire {
  constructor(mm) {
    this.mm = mm
    this.status = true
    this.error = ''
  }
  checkStatus(tireMm) {
    return tireMm > 2 // min tire mm
  }
  passKm(km) {
    const newMm = this.mm - km/NORMAL_TIRE
    if(!this.checkStatus(newMm)) {
      this.error = NO_TIRE
      this.status = false
    } else {
      this.mm = newMm
    }
    return this
  }
  inspection(init) {
    this.mm = init
    this.status = true
    this.error = ''
  }
}

class SmartCar {
  constructor(name, oil, tire) {
    this.name = name
    this.initOil = oil
    this.initTire = tire
    this.oliInfo = new Oil(oil)
    this.tireInfo = new Tire(tire)
    this.totatKm = 0
  }

  setTotalKm(km) {
    this.totatKm += km
  }

  drive(km) {
    const oil = this.oliInfo.passKm(km)
    const tire = this.tireInfo.passKm(km)
    
    if(oil.status && tire.status) {
      this.setTotalKm(km)
      return `${this.name} drives ${km} km. Total km is ${this.totatKm}`
    } else {
      return [oil.error, tire.error].join('. ')
    }
  }

  doInspection() {
    !this.oliInfo.status && this.oliInfo.inspection(this.initOil)
    !this.tireInfo.status && this.tireInfo.inspection(this.initTire)
  }

  checkStatus() {
    return `
      Oil: ${this.oliInfo.amount}L;
      Tires: ${this.tireInfo.mm}mm;
    `
  }
}

const bmw = new SmartCar('Bmw', 7, 7) // Bmw with 7l of oil and 7mm of tire

bmw.drive(5000) // drive some km
bmw.checkStatus() // check current status
bmw.doInspection() // do inspection
// Observer
// Simple event emitter

class Emitter {
  constructor() {
    this.actions = {}
  }
  register(action, fn) {
    if(this.actions[action]) {
      this.actions[action].push(fn)

      return
    }
    this.actions[action] = [fn]
  }

  emit(action) {
    (this.actions[action] || []).map(fn => fn())
  }
}

const emitter = new Emitter()

emitter.register('action', () => console.log('123'))
emitter.register('action', () => console.log('4321'))
emitter.register('action', () => console.log('1342'))

emitter.emit('action')
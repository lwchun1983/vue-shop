const STORAGE_NAME = 'shose_mall'
class Storage {
  static getItem (name, module = null) {
    const storage = Storage.getStorage()
    if (module != null) {
      if (Reflect.has(storage, module)) {
        return storage[module][name]
      } else {
        return ''
      }
    } else {
      return storage[name] || ''
    }
  }
  static setItem (name, value) {
    const storage = Storage.getStorage()
    storage[name] = value
    Storage.setStorage(storage)
  }
  static getStorage () {
    return JSON.parse(sessionStorage.getItem(STORAGE_NAME) || '{}')
  }
  static setStorage (value) {
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(value))
  }
  static deleteItem (name, module = null) {
    const storage = Storage.getStorage()
    if (module != null) {
      if (Reflect.has(storage, module)) {
        Reflect.deleteProperty(storage[module], name) 
      }
    } else {
      Reflect.deleteProperty(storage, name) 
    }
    Storage.setStorage(storage)
  }
  static clear () {
    sessionStorage.removeItem(STORAGE_NAME)
  }
}


export {
  Storage
}
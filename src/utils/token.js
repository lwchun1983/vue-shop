const {Storage} = require('./storage.js')

class Token {
  static setToken (token, time = 2) {
    const tokenData = {
      value: token,
      expire: Date.now() + time * 3600 * 1000
    }
    Storage.setItem('token', tokenData)
  }
  static getToken () {
    const token = Storage.getItem('token') || []
    if (token.length === 0) {
      return ''
    }
    if (token.expire < Date.now()) {
      return ''
    }
    return token.value
  }
  static deleteToken () {
    Storage.deleteItem('token')
  }
}

export {
  Token
}
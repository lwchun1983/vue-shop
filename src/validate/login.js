export default {
  username (val) {
    if (val === '') {
      return {error: 1, message: '账号为空'}
    }
    if (val.length < 3) {
      return {error: 1, message: '账号长度小于3'}
    }
    return {error: 0}
  },
  password (val) {
    if (val === '') {
      return {error: 1, message: '密码为空'}
    }
    if (val.length < 6) {
      return {error: 1, message: '密码长度小于6'}
    }
    return {error: 0}
  }
}

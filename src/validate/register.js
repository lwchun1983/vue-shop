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
  },
  confirmPwd (val, password) {
    if (val === '') {
      return {error: 1, message: '确认密码为空'}
    }
    if (val !== password) {
      return {error: 1, message: '两次密码不一致'}
    }
    return {error: 0}
  },
  nickname (val) {
    if (val === '') {
      return {error: 1, message: '昵称为空'}
    }
    if (val.length < 2) {
      return {error: 1, message: '昵称长度小于2'}
    }
    return {error: 0}
  },
}

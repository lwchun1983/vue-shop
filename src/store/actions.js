import {Token} from '@/utils/token'
export default {
  async getUser ({commit}, axios) {
    const token = Token.getToken()
    if (token != '') {
      const user = await axios.get('api/user', {
        headers: {
          token
        }
      })
      console.log(user)
      commit('setUser', user)
    }
  }
}
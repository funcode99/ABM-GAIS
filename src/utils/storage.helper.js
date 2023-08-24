import jwtDecode from "jwt-decode"

const Storage = {
  decodeToken(token) {
    return jwtDecode(token)
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
}

export default Storage

import auth0 from 'auth0-js'

export default class AuthService {

  constructor () {
    this.login = this.login.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: 'newgermes.auth0.com',
    clientID: 'cQeH3bOPfBY5KgEAbi1OYInZp_DCnbQK',
    redirectUri: 'http://localhost:8080/secretquote',
    audience: 'https://newgermes.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    this.auth0.authorize()
  }
}
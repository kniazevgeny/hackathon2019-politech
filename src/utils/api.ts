// Dependencies
import axios from 'axios'
import { User } from '../models/user'
import { store } from '../plugins/store'


let base = store.state.apiuri

export async function loginFacebook(accessToken: string) {
  return (await axios.post(`${base}/login/facebook`, {
    accessToken,
  })).data as User
}

export async function loginGoogle(accessToken: string) {
  return (await axios.post(`${base}/login/google`, {
    accessToken,
  })).data as User
}

export async function loginTelegram(loginInfo: any) {
  return (await axios.post(`${base}/login/telegram`, loginInfo)).data as User
}

export async function tmprequest(loginInfo: any) {
  base = store.state.apiuri
  return (await axios.post(`${base}/auth`, loginInfo)).data as User
}

export async function ssearch(srch: any) {
  base = store.state.apiuri
  return (await axios.post(`${base}/search`, srch))
}

export async function reset(user: User) {
  return (await axios.post(
    `${base}/users/reset`,
    {},
    {
      headers: getHeaders(user),
    }
  )).data
}

function getHeaders(user: User) {
  if (user.token) {
    return { token: user.token }
  } else {
    return undefined
  }
}

export interface User {
  auth: boolean
  uniqueid: string
  name: string
  token: string
  photourl: string
  [favourites: number]: any
  busy: boolean
  }
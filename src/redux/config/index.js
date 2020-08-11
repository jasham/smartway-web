import axios from 'axios'
import store  from '../store'

// export const baseUrl = 'http://192.168.12.33:8000/'
export const baseUrl = 'http://192.168.1.59:5000/'
export const user_id = localStorage.getItem('user_id')
export const username = localStorage.getItem('username')
export const access_token = localStorage.getItem('access_token')
export const refresh_token = localStorage.getItem('refresh_token')


export const authData = store.getState().otp

 export const token = () => {
   return ( store.getState().otp.otpData.data[0].access_token)
 }

export default () => {
  if (token) {
    return axios.create({
      baseURL: baseUrl,
    })
  } else {
    return axios.create({
      baseURL: baseUrl
    })
  }
}

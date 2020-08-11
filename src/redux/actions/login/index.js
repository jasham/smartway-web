import client, {token} from '../../config'
import axios from 'axios'
import { LOGIN_API, REFRESH_TOKEN_API, LOGOUT_USER_API, FORGOT_PASSWORD_API } from '../../apis'
import { baseUrl } from '../../config'
import { LOGIN_TYPE, ERROR_TYPE, LOGOUT_USER, FORGOT_PASSWORD, REFRESH_TOKEN, CLEAR_DATA } from '../../types'

export const loginUser = (data) =>{
    return async dispatch => {
        return client().post(`${LOGIN_API}`, data).then((res) => {
            dispatch({
                type : LOGIN_TYPE,
                data : res
            })
        }).catch((err)=>{
            dispatch({
                type : LOGIN_TYPE,
                data : err
            })
        })
    }
}

export const setLoginData = () =>{
    return async dispatch => {
        dispatch({
            type : LOGIN_TYPE,
            data : {}
        })
    }
}

export const logoutUser = (access_token,refresh_token) => {
    return async dispatch => {
        return client().post(`${LOGOUT_USER_API}`,refresh_token,{
            headers : {
                "Authorization" : `Bearer ${access_token}`
            }
        }).then((res) => {
            dispatch({
                type : CLEAR_DATA ,
                data : res
            })
            dispatch({
                type : LOGOUT_USER ,
                data : res
            })            
        }).catch((err)=>{
            dispatch({
                type : LOGOUT_USER,
                data : err
            })
        })
    }
}


export const forgotPassword = (email) => {
    return async dispatch => {
        return client().get(`${FORGOT_PASSWORD_API}`,{
            params : {
                ...email
            }
        }).then((res) => {
            dispatch({
                type : FORGOT_PASSWORD,
                data : res.data
            })
        }).catch((err)=>{
            dispatch({
                type : FORGOT_PASSWORD,
                data : err
            })
        })
    }
}


export const setForgotData = () => {
    return async dispatch => {
        dispatch({
            type : FORGOT_PASSWORD,
            data : {}
        })
    }
}

export const refreshToken = (refresh_token) => {
    return async dispatch => {
        return client().post(`${REFRESH_TOKEN_API}`, refresh_token).then((res) => {
            localStorage.setItem('access_token',res.data.access)
            dispatch({
                type : REFRESH_TOKEN,
                data : res
            })
        }).catch((err)=>{
            dispatch({
                type : REFRESH_TOKEN,
                data : err
            })
        })
    }
}

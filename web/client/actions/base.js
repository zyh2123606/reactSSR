import {CHECK_AUTH, SET_AUTH} from '../constants'

//检查权限
export const checkAuth = auth => ({type: CHECK_AUTH, auth}) 
//设置权限
export const setAuth = auth => ({type: SET_AUTH, auth}) 
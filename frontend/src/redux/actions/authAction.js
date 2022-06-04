import ACTIONS from './index'
import axios from 'axios'


export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }

}
export const STDdispatchLogin = () => {
    return {
        type: ACTIONS.LOGINSTD
    }

}

export const fetchUser = async(token) => {
    const res = await axios.get('/user/infor',{
        headers: {Authorization: token}

    })
    return res
}
export const STDfetchUser = async(token) => {
    const res = await axios.get('/student/info',{
        headers: {Authorization: token}

    })
    return res
}

export const fetchSup = async(token) => {
    const res = await axios.get('/user/supinfo',{
        headers: {Authorization: token}

    })
    return res
}

export const dispatchGetUser = (res) => {
   return {
         type: ACTIONS.GET_USER,
            payload:{
                user: res.data,
                isAdmin: res.data.role === 1 ? true : false,
                isSuper: res.data.role === 2 ? true : false,
                isCoSuper: res.data.role === 3 ? true : false,
                isPanel: res.data.roledesc === 1 ? true : false


            }
   }
}





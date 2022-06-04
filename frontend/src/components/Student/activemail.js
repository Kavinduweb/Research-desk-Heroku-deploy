import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'

function StdActivation() {

  const {activetocken} = useParams()

  const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')


    useEffect(() => {
        if(activetocken){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/student/active', {activetocken})
                    setSuccess(res.data.msg)
                    console.log(res.data.msg)

                }catch (e) {
                    err.response.data.msg && setErr(err.response.data.msg)
                    console.log(e)
                }
            }
            activationEmail()
        }
    },[activetocken])

   



  return (
    <div className = "activite_page">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}


    </div>
  )
}

export default StdActivation
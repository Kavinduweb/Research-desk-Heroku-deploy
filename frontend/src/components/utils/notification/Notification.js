import React from 'react'
import './notification.css'

export const showErrMsg = (msg) => {
    return (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{msg}</strong> 
        
      </div>
    )
}

export const showSuccessMsg = (msg) => {
    return (
      <div class="alert alert-success" role="alert">
     {msg}
    </div>
    )
}
import React, {useEffect} from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useDispatch, useSelector} from 'react-redux'

import {dispatchLogin,STDdispatchLogin,STDfetchUser, fetchUser, dispatchGetUser} from './redux/actions/authAction'

import Header from './components/header/Header';
import NavBar from "./components/header/NavBar";
import Body from './components/body/Body';
import axios from "axios";



function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const tokenstd = useSelector(state => state.tokenstd)
  const { isSTD, isLogged} = auth
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin) {
      const getToken = async () => {
          const res = await axios.post('/user/refresh_token', null)
  
          dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }

  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
      dispatch(dispatchLogin())

      return fetchUser(token).then(res => {

        dispatch(dispatchGetUser(res))


      })
      }
      getUser()
    }

  },[token, dispatch])

  useEffect(() => {
    const firstLogin1 = localStorage.getItem('firstLogin1')
    if(firstLogin1) {
      const getToken = async () => {
          const res = await axios.post('/student/access', null)
  
          dispatch({type: 'GET_TOKENSTD', payload: res.data.access_token})
      }
      getToken()
     
    }
    
  }, [auth.isSTD, dispatch])

  useEffect(() => {
    if(tokenstd){
      const getUser = () => {
      dispatch(STDdispatchLogin())

      return STDfetchUser(tokenstd).then(res => {

        dispatch(dispatchGetUser(res))


      })
      }
      getUser()
    } },[tokenstd, dispatch])
  return (

    <Router>

      <div className="App " style={{ background: "white" }} >
        
      

        <hr
        style={{
          color: "black",
          marginTop: "-1em",
          color: "#E2A500",
          backgroundColor: "#E2A500",

          width: "1500px",
          marginLeft: "-1em",
          height: "8px",
      

        }}
        />
        
<hr
        style={{
          color: "black",
          marginTop: "-1em",
          color: "#E2A500",
          backgroundColor: "#E2A500",

          width: "1500px",
          marginLeft: "-1em",
          height: "8px",
      

        }}
        />
        <hr
        style={{
          color: "black",
          marginTop: "-1em",
          color: "#E2A500",
          backgroundColor: "#E2A500",

          width: "1500px",
          marginLeft: "-1em",
          height: "8px",
      

        }}
        />
         <hr
        style={{
          color: "black",
          marginTop: "-1em",
          color: "#E2A500",
          backgroundColor: "#E2A500",

          width: "1500px",
          marginLeft: "-1em",
          height: "8px",
      

        }}
        />
         <hr
        style={{
          color: "black",
          marginTop: "-1em",
          color: "#E2A500",
          backgroundColor: "#E2A500",

          width: "1500px",
          marginLeft: "-1em",
          height: "8px",
      

        }}
        />

        
      

      




        {isSTD?
      <div>
      <Link to="/Student-Home">
      <img src="https://courseweb.sliit.lk/pluginfile.php/1/theme_lambda/logo/1629135847/sliit_logo.jpg" alt=""/>
      </Link>
      <br/>
      </div>  :
      (isLogged?
        <div>
      <Link to="/staffhome">
      <img src="https://courseweb.sliit.lk/pluginfile.php/1/theme_lambda/logo/1629135847/sliit_logo.jpg" alt=""/>
      </Link>
      <br/>
      </div>  :
      (<div>
        <Link to="/">
        <img src="https://courseweb.sliit.lk/pluginfile.php/1/theme_lambda/logo/1629135847/sliit_logo.jpg" alt=""/>
        </Link>
        <br/>
        </div> )
      )
  


      }


        
        {isSTD? <NavBar/> :<Header/>}
       
        
        <Body/>
      </div>
      
    </Router>
  );
}

export default App;

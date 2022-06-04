import axios from 'axios';





  export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
  
    try {
      const response = await axios.get(
        // 'http://localhost:5000/api/users/getallusers'
        // 'http://localhost:5003/api/users/getallusers'
        'http://localhost:8000/test/getallusers'

      );
      console.log(response);
      dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_USERS_FAILED", payload: error });
    }
  };

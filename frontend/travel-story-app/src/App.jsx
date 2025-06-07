import React from "react";
import{BrowserRouter as Router,Routes,Route,Navigate}from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Home from "./pages/Home/Home.jsx";
const App=()=>{
  return(
    <div>
   
      <Router>
        <Routes>
        <Route path="/" exact element={<Root/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signUp" exact element={<SignUp/>}/>
        </Routes>
      </Router>
    
    </div>
  )
}

//Define the root component to handle the initial redirect
const Root=()=>{
  //check if token exists in local storage
  const isAuthenticated= !!localStorage.getItem("token");

  //redirect to dashboard if authenticated,otherwise to login
  return isAuthenticated?(
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/login"/>
  );
}
export default App;

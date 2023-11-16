import React, { createContext, useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "./Pages/userAuthForm.page";
import { lookInSession } from './common/session';
import Editor from './Pages/editor.pages';

export const UserContext=createContext({})
function App() {

  const[userAuth,setUserAuth]=useState();
  useEffect(()=>{
    let userInSession=lookInSession("user");
    userInSession?setUserAuth(JSON.parse(userInSession)):setUserAuth({access_token:null})
  },[])
  return (
    <div>
      <UserContext.Provider value={{userAuth,setUserAuth}}>
      <Routes>
        <Route path="/editor" element={<Editor/>} />
        <Route path="/" element={<NavBar />}>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />}/> 
          <Route path="/signup" element={<UserAuthForm type="sign-up" />}/> 
        </Route>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

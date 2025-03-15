import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './component/AppLayout'
import IntroDetails from './pages/IntroDetails'
import ProfilePage from './pages/ProfilePage'
import PublicProfile from './pages/PublicProfile'
import SignupPage from './pages/SignupPage'
import CreateCardPage from './pages/CreateCardPage'
import LoginPage from './pages/LoginPage'
import { getUsername } from './services/apiCard'
import ProtectedRoute from './component/ProtectedRoute'
import {   useQuery } from '@tanstack/react-query'

const App = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername
  });

  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );
  return (
    
   <BrowserRouter>
   <Routes>
   <Route
          path="/"
          element={
            <AppLayout
              isAuthenticated={isAuthenticated}
              username={username}
              setUsername={setUsername}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        >
    <Route index element={<HomePage/>}/>
    <Route path="cards/:id" element={<IntroDetails/>} />
    <Route
            path="signin"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername}
              />
            }
          />
    <Route path='signup/' element={<SignupPage/>} />
    <Route path='user/profile/:username' element={<ProfilePage/>}/>
    <Route
            path="create/"
            element={
              <ProtectedRoute>
                <CreateCardPage />
              </ProtectedRoute>
            }
          />
    </Route>
    <Route path='profile/:username' element={<PublicProfile/>}/>
   </Routes>
   </BrowserRouter>
  )
  
}

export default App

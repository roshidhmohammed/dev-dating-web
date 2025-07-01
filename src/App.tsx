import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/authentication/LoginPage"
import RegisterPage from "./Pages/authentication/RegisterPage"
import AppLayout from "./components/layouts/AppLayout"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import Alert from "./components/common/Alert"

function App() {

  return (
    <>
    <Alert/>
  <BrowserRouter>
  <Routes>
   <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/" element={<AppLayout/>}>
            <Route index path="/" element={<Feed />}/>
      <Route path="/profile" element={<Profile />}/>

      </Route>

  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App

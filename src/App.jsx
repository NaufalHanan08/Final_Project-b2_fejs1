import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/authentication/LoginPage"
import RegisterPage from "./pages/authentication/RegisterPage"
import SearchPage from "./pages/SearchPage"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

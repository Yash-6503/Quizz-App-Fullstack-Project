import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Quizzes from './pages/Quizzes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Quizz from './pages/Quizz'
import NotFound from './pages/NotFound'
import Footer from './components/footer/Footer';


function App() {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='*' Component={NotFound} />
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizz/:id" element={<Quizz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App

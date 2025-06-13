import React from 'react'
import Navbar from './components/navbar/AdminNavbar'
import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import Questions from './pages/Questions';
import Users from './pages/Users';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import AddQuestion from './components/add/AddQuestion';
import AddUser from './components/add/AddUser';
import AddQuizz from './components/add/AddQuizz';

function App() {
  return (
    <div>
      <Navbar />
        {/* <Login/> */}
        <Routes>
              <Route path='*' Component={NotFound} />
              <Route path="/" element={<Login/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quizz/add" element={<AddQuizz />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/question/add" element={<AddQuestion />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/add" element={<AddUser />} />
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
        </Routes>
      <Footer />
      
    </div>
  )
}

export default App

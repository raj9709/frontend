import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null; // Renders the element only if authenticated
};

function App() {
  const isAuthenticated = false; // Replace this with your authentication logic

  return (
    <div className='text-3xl font-bold items-center'>
      <Router>
        <Routes>
        <Route path='/dashboard' exact element={<Home/>}/>
          <Route path='/' exact element={<Login/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

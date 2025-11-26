import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { colors } from './styles/colors';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" style={appStyle}>
          <Header />
          <main style={mainStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

const appStyle = {
  minHeight: '100vh',
  background: colors.cream,
  color: colors.darkBrown
};

const mainStyle = {
  minHeight: '80vh'
};

export default App;
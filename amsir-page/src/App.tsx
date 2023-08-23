import React from 'react';
import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Header from './components/Header/Header'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import VideoPlayerPage from './pages/WelcomePage/VideoPlayerPage';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/demo' element={<VideoPlayerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

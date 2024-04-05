import './App.css';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Header from './components/Header/Header'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import VideoPlayerPage from './pages/VideoPlayerPage/VideoPlayerPage';
import UserSignUp from './pages/UserSignUp/UserSignUp';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/demo' element={<VideoPlayerPage />} />
          <Route path='/signup' element={<UserSignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

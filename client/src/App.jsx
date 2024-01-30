import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import toast, { Toaster } from 'react-hot-toast'
import Summary from './pages/Summary';
import Completion from './pages/Completion';

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/completion' element={<Completion />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

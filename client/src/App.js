import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
// import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';

import Scheduler from './components/ProjectManagement/Scheduler/Scheduler';
import Ticket from './components/ProjectManagement/Ticket/TicketDashboard';

import GameOne from './components/Games/GameOne';
import Timer from './components/Utility/Timer';
import Pinata from './components/Pinata/Pinata';

import Login from './components/Login/Login';


function App() {
  const isAuthenticated = useSelector(state => state.auth.authenticated);
  
  return (
    <>
        {isAuthenticated ? (
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/project-management/scheduler" element={<Scheduler />} />
              <Route path="/project-management/ticket" element={<Ticket />} />

              <Route path="/pinata" element={<Pinata />} />
              <Route path="/utility/timer" element={<Timer />} />
              <Route path="/games/game-one" element={<GameOne />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
    </>
  )
}

export default App

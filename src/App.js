// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AppData from './components/addData';

const App = () => {
  return (
    <div class='body'>
      <Router>
        <Routes>
        <Route path='/adddata' Component={AppData}></Route>  
        </Routes>
      </Router>
      <Dashboard />
    </div>
  );
};

export default App;

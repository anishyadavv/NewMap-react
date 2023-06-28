import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
          <Route  path="/" element={<News key="general" pageSize={10} category="general" country="in"/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/business" element={<News key="business" pageSize={10} category="business" country="in"/>}/>
          <Route path="/entertainment" element={<News key="entertainment" pageSize={10} category="entertainment" country="in"/>}/>
          <Route path="/health" element={<News key="health" pageSize={10} category="health" country="in"/>}/>
          <Route path="/science" element={<News key="science" pageSize={10} category="science" country="in"/>}/>
          <Route path="/sports" element={<News key="sports" pageSize={10} category="sports" country="in"/>}/>
          <Route path="/technology" element={<News key="technology" pageSize={10} category="technology" country="in"/>}/>
        </Routes>
        </Router>
        
      </div>
    )
  }
}


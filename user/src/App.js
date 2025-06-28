import logo from './logo.svg';
import './App.css';
import React from 'react'
import {LetterList} from "./components/letterList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LetterView } from './components/LetterView';
import { Divide } from 'lucide-react';
import { LetterUploader } from './components/admin/LetterUploader';
import { About } from './components/About';
function App() {
  return (
      
      <Router>
        <div>
          
        
        <Routes>
          <Route path="/" element={<LetterList />} />
          <Route path="/letter/:id" element={<LetterView />} />
          <Route path="/admin/upload/1324" element={<LetterUploader />} />
          <Route path="/about" element={<About />} />
          {/* Add more routes as needed */}
        </Routes>
    </div>

      </Router>
      
  );
}

export default App;

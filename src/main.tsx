import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import App from './App';
import GithubDetailsUser from './components/github/details-user';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:username/details" element={<GithubDetailsUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
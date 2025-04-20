import React from 'react';
import Home from './Home';
import Payment from './Payment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment/:paymentId" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
// src/App.jsx

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import BasicProbabilities from './pages/BasicProbabilities';
import AdvancedProbabilities from './pages/AdvancedProbabilities';
import Combinatorics from './pages/Combinatorics';

// header and footer defined outside of routes to appear on all pages
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/basic" element={<BasicProbabilities />} />
                <Route path="/advanced" element={<AdvancedProbabilities />} />
                <Route path="/combinatorics" element={<Combinatorics />} />
            </Routes>

            
        </>
    );
}

export default App;
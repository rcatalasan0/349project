import React, { useState, useEffect, useCallback } from 'react';
import '../index.css'; 

// only good up to 20!
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
        if (result === Infinity) return Infinity; 
    }
    return result;
}

/*  <><><><><><><><><><>  NAVIGATION  <><><><><><><><><><>  */
const Navigation = () => {
    return (
        <header className="main-header">
            <div className="logo">Simulations & Simulacra</div>
            <nav className="main-nav">
                <div className="dropdown">
                    <button className="dropbtn">Menu ▾</button>
                    <div className="dropdown-content">
                        <a href="#/">Basic Probabilities</a>
                        <a href="#/advanced">Advanced Probabilities</a>
                        <a href="#/combinatorics">Combinatorics</a>
                    </div>
                </div>
                <a href="#/" className="nav-link">Home</a>
            </nav>
        </header>
    );
};

/*  <><><><><><><><><><>  FOOTER  <><><><><><><><><><>  */
const Footer = () => {
    return (
        <footer>
            &copy; 2025 Simulations & Simulacra
        </footer>
    );
};

/*  <><><><><><><><><><>  MAIN CONTENT  <><><><><><><><><><>  */
function Combinatorics() {
    
    // placeholders
    const defaultN = 10;
    const defaultK = 3;
    const defaultNRep = 4;
    const defaultKRep = 2;
    
    // input and calculations
    const [inputPermN, setInputPermN] = useState(defaultN);
    const [inputPermK, setInputPermK] = useState(defaultK);
    const [inputCombN, setInputCombN] = useState(defaultN);
    const [inputCombK, setInputCombK] = useState(defaultK);
    const [inputCombRepN, setInputCombRepN] = useState(defaultNRep);
    const [inputCombRepK, setInputCombRepK] = useState(defaultKRep);
    const [calcPermN, setCalcPermN] = useState(defaultN);
    const [calcPermK, setCalcPermK] = useState(defaultK);
    const [calcCombN, setCalcCombN] = useState(defaultN);
    const [calcCombK, setCalcCombK] = useState(defaultK);
    const [calcCombRepN, setCalcCombRepN] = useState(defaultNRep);
    const [calcCombRepK, setCalcCombRepK] = useState(defaultKRep);

    // results
    const [permResult, setPermResult] = useState('N/A');
    const [combResult, setCombResult] = useState('N/A');
    const [combRepResult, setCombRepResult] = useState('N/A');


    // PERMUTATION LOGIC
    const calculatePermutation = useCallback(() => {
        const n = parseInt(calcPermN);
        const k = parseInt(calcPermK);

        if (isNaN(n) || isNaN(k) || n < 0 || k < 0 || k > n) {
            setPermResult("Please ensure n and k are non-negative, and k is less than or equal to n.");
            return;
        }
        
        const result = factorial(n) / factorial(n - k);
        setPermResult(result.toLocaleString());
    }, [calcPermN, calcPermK]);

    // COMBINATION LOGIC
    const calculateCombination = useCallback(() => {
        const n = parseInt(calcCombN);
        const k = parseInt(calcCombK);

        if (isNaN(n) || isNaN(k) || n < 0 || k < 0 || k > n) {
            setCombResult("Please ensure n and k are non-negative, and k is less than or equal to n.");
            return;
        }

        const denominator = factorial(k) * factorial(n - k);
        const result = factorial(n) / denominator;
        setCombResult(result.toLocaleString());
    }, [calcCombN, calcCombK]);
    
    // COMBINATION WITH REPETITION LOGIC
    const calculateCombinationRep = useCallback(() => {
        const n = parseInt(calcCombRepN);
        const k = parseInt(calcCombRepK);

        if (isNaN(n) || isNaN(k) || n < 1 || k < 0) {
            setCombRepResult("Please ensure n is 1 or greater, and k is non-negative.");
            return;
        }

        const n_plus_k_minus_1 = n + k - 1;
        const denominator = factorial(k) * factorial(n_plus_k_minus_1 - k);
        const result = factorial(n_plus_k_minus_1) / denominator;
        setCombRepResult(result.toLocaleString());
    }, [calcCombRepN, calcCombRepK]);


    useEffect(() => {
        calculatePermutation();
        calculateCombination();
        calculateCombinationRep();
        
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }, [calculatePermutation, calculateCombination, calculateCombinationRep]);


    // handlers
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    }

    const handlePermutationCalculate = () => {
        setCalcPermN(inputPermN);
        setCalcPermK(inputPermK);
    };

    const handleCombinationCalculate = () => {
        setCalcCombN(inputCombN);
        setCalcCombK(inputCombK);
    };

    const handleCombinationRepCalculate = () => {
        setCalcCombRepN(inputCombRepN);
        setCalcCombRepK(inputCombRepK);
    };


    /*  <><><><><><><><><><>  RETURN  <><><><><><><><><><>  */
    return (
        <>
            <Navigation />
            <main className="container">
                {/* Permutations Section */}
                <section className="body-section">
                    <h1>
                        Permutations (Order Matters): <span className="mathjax-formula">
                            {'\\(P(n, k) = \\frac{n!}{(n-k)!}\\)'} 
                        </span>
                    </h1>
                    <p>The number of ways to arrange <b>k</b> items from a set of <b>n</b> items, where the order of arrangement is important.</p>
                    
                    <div className="input-group">
                        <label htmlFor="perm-n">n (Total Items in the set):</label>
                        <input
                            type="number"
                            id="perm-n"
                            value={inputPermN}
                            onChange={handleInputChange(setInputPermN)}
                            min="0"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="perm-k">k (Items to choose/arrange):</label>
                        <input
                            type="number"
                            id="perm-k"
                            value={inputPermK}
                            onChange={handleInputChange(setInputPermK)}
                            min="0"
                        />
                    </div>

                    <button 
                        onClick={handlePermutationCalculate} 
                        className="button"
                    >
                        Calculate Permutations ($P(n, k)$)
                    </button>

                    <div id="permutation-result" className="feature-box" style={{ marginTop: '20px' }}>
                        There are <b>{permResult}</b> possible ordered arrangements (Permutations).
                    </div>
                </section>
                
                <hr />

                {/* Combinations Section */}
                <section className="body-section">
                    <h1>
                        Combinations (Order Does Not Matter): <span className="mathjax-formula">
                            {'\\(C(n, k) = \\frac{n!}{k!(n-k)!}\\)'}
                        </span>
                    </h1>
                    <p>The number of ways to choose <b>k</b> items from a set of <b>n</b> items, where the order of selection is not important.</p>

                    <div className="input-group">
                        <label htmlFor="comb-n">n (Total Items in the set):</label>
                        <input
                            type="number"
                            id="comb-n"
                            value={inputCombN}
                            onChange={handleInputChange(setInputCombN)}
                            min="0"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="comb-k">k (Items to choose):</label>
                        <input
                            type="number"
                            id="comb-k"
                            value={inputCombK}
                            onChange={handleInputChange(setInputCombK)}
                            min="0"
                        />
                    </div>

                    <button 
                        onClick={handleCombinationCalculate} 
                        className="button"
                    >
                        Calculate Combinations ($C(n, k)$)
                    </button>

                    <div id="combination-result" className="feature-box" style={{ marginTop: '20px' }}>
                        There are <b>{combResult}</b> possible unique groups (Combinations).
                    </div>
                </section>

                <hr />

                {/* Combination with Repetition Section */}
                <section className="body-section">
                    <h1>
                        Combination with Repetition: <span className="mathjax-formula">
                            {'\\(C(n+k-1, k) = \\frac{(n+k-1)!}{k!(n-1)!}\\)'}
                        </span>
                    </h1>
                    <p>The number of ways to choose <b>k</b> items from <b>n</b> possibilities, allowing for repeated selections.</p>

                    <div className="input-group">
                        <label htmlFor="comb-rep-n">n (Number of item types/categories):</label>
                        <input
                            type="number"
                            id="comb-rep-n"
                            value={inputCombRepN}
                            onChange={handleInputChange(setInputCombRepN)}
                            min="1"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="comb-rep-k">k (Items to choose):</label>
                        <input
                            type="number"
                            id="comb-rep-k"
                            value={inputCombRepK}
                            onChange={handleInputChange(setInputCombRepK)}
                            min="0"
                        />
                    </div>

                    <button 
                        onClick={handleCombinationRepCalculate} 
                        className="button"
                    >
                        Calculate Combination with Repetition
                    </button>

                    <div id="combination-rep-result" className="feature-box" style={{ marginTop: '20px' }}>
                        There are <b>{combRepResult}</b> possible selections with replacement.
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Combinatorics;
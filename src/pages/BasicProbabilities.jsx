// BasicProbabilities.jsx
import React, { useState, useCallback, useEffect } from 'react';
import '../index.css'; // <-- 1. Corrected CSS path


function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
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
                        <a href="/" className="nav-link">Basic Probabilities</a> 
                        <a href="/advanced" className="nav-link">Advanced Probabilities</a> 
                        <a href="/combinatorics" className="nav-link">Combinatorics</a>
                    </div>
                </div>
                <a href="/" className="nav-link">Home</a>
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
const BasicProbabilities = () => {
    
    // input state management
    const [inputNumerator, setInputNumerator] = useState(1);
    const [inputDenominator, setInputDenominator] = useState(4);
    const [inputScalingTrials, setInputScalingTrials] = useState(100);
    const [numerator, setNumerator] = useState(1);
    const [denominator, setDenominator] = useState(4);
    const [scalingTrials, setScalingTrials] = useState(100);

    // output state management
    const [probFraction, setProbFraction] = useState('N/A');
    const [probPercentage, setProbPercentage] = useState('N/A');
    const [probDecimal, setProbDecimal] = useState('N/A');
    const [probSimplified, setProbSimplified] = useState('N/A');
    const [expectedSuccesses, setExpectedSuccesses] = useState('N/A');
    const [isValid, setIsValid] = useState(true);

    const calculateInsights = useCallback(() => {
        const N = parseInt(numerator);
        const D = parseInt(denominator);
        const T = parseInt(scalingTrials);

        // input vlalidation
        if (isNaN(N) || isNaN(D) || N < 0 || D <= 0 || N > D) {
            setProbFraction('N/A');
            setProbDecimal('N/A');
            setProbPercentage('N/A');
            setProbSimplified('N/A');
            setExpectedSuccesses('N/A');
            setIsValid(false);
            return;
        }

        setIsValid(true);
        const probability = N / D;

        // placeholder
        setProbFraction(`${N}/${D}`);
        setProbDecimal(probability.toFixed(4));
        setProbPercentage(`${(probability * 100).toFixed(2)}%`);

        // simplified fraction
        if (N === 0) {
            setProbSimplified('0/1');
        } else if (N === D) {
            setProbSimplified('1/1');
        } else {
            const commonDivisor = gcd(N, D);
            const simplifiedN = N / commonDivisor;
            const simplifiedD = D / commonDivisor;
            setProbSimplified(`${simplifiedN}/${simplifiedD}`);
        }

        // expected successes
        const expected = (probability * T).toFixed(0);
        setExpectedSuccesses(expected);

    }, [numerator, denominator, scalingTrials]);

    useEffect(() => {
        calculateInsights();
    }, [calculateInsights]);


    const handleInputNumberChange = (setter) => (e) => {
        setter(e.target.value);
    };

    // calculate handler
    const handleCalculateClick = () => {
        setNumerator(parseInt(inputNumerator));
        setDenominator(parseInt(inputDenominator));
        setScalingTrials(parseInt(inputScalingTrials)); 
        calculateInsights(); 
    };

    // update scaling handler
    const handleUpdateScalingClick = () => {
        if (!isValid) {
            alert("Please calculate the probability first with valid inputs.");
            return;
        }
        setScalingTrials(parseInt(inputScalingTrials));
    };


    /*  <><><><><><><><><><>  RETURN  <><><><><><><><><><>  */
    return (
        <>
            <Navigation />
            <main className="container">
                <section id="basic-calc" className="body-section">
                    <h1>Basic Probability Input and Insights</h1>
                    <p>Input your number of favorable outcomes and total outcomes to instantly see simplified probabilities and understandable insights.</p>

                    <div className="input-group">
                        <label htmlFor="numerator">Favorable Outcomes (Numerator):</label>
                        <input
                            type="number"
                            id="numerator"
                            value={inputNumerator}
                            onChange={handleInputNumberChange(setInputNumerator)}
                            min="0"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="denominator">Total Outcomes (Denominator):</label>
                        <input
                            type="number"
                            id="denominator"
                            value={inputDenominator}
                            onChange={handleInputNumberChange(setInputDenominator)}
                            min="1"
                        />
                    </div>

                    <button
                        id="calculate-btn"
                        className="button"
                        onClick={handleCalculateClick} // update on click
                    >
                        Calculate Insights
                    </button>

                    <hr style={{ margin: '20px 0' }} />

                    <h2>Probability Insights</h2>
                    <div id="output-insights" style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', flexWrap: 'wrap' }}>
                        <p className="feature-box">Probability: <b id="prob-fraction">{probFraction}</b></p>
                        <p className="feature-box">Percentage: <b id="prob-percentage">{probPercentage}</b></p>
                        <p className="feature-box">Decimal: <b id="prob-decimal">{probDecimal}</b></p>
                        <p className="feature-box">Simplified Fraction: <b id="prob-simplified">{probSimplified}</b></p>
                    </div>

                    <div id="verbal-insight" className="feature-box" style={{ marginTop: '20px' }}>
                        <p>If this event occurred <b>{scalingTrials}</b> times (Scaling Tweak), you would expect to succeed <b>{expectedSuccesses}</b> times.</p>
                    </div>

                    <hr style={{ margin: '20px 0' }} />

                    <h2>Output Tweaks (Mutators)</h2>
                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="scaling-trials">Scale to <b>X</b> Trials:</label>
                        <input
                            type="number"
                            id="scaling-trials"
                            value={inputScalingTrials}
                            onChange={handleInputNumberChange(setInputScalingTrials)}
                            min="1"
                        />
                        <button
                            id="update-scaling-btn"
                            className="button"
                            onClick={handleUpdateScalingClick} // update on click
                            style={{ width: 'auto', marginTop: '0' }}
                        >
                            Update Scaling
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BasicProbabilities;
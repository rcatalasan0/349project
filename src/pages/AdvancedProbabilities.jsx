import React, { useState, useEffect, useCallback } from 'react';
import '../index.css'; 

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
function AdvancedProbabilities() {
    
    // initializing
    const defaultProbA = 0.2;
    const defaultProbBGivenA = 0.8;
    const defaultPriorA = 0.01;
    const defaultPBGivenA_Bayes = 0.95;
    const defaultPBGivenNotA = 0.10;

    // input and calculation states
    const [inputProbA, setInputProbA] = useState(defaultProbA);
    const [inputProbBGivenA, setInputProbBGivenA] = useState(defaultProbBGivenA);
    const [inputPriorA, setInputPriorA] = useState(defaultPriorA);
    const [inputPBGivenA_Bayes, setInputPBGivenA_Bayes] = useState(defaultPBGivenA_Bayes);
    const [inputPBGivenNotA, setInputPBGivenNotA] = useState(defaultPBGivenNotA);
    const [calcProbA, setCalcProbA] = useState(defaultProbA);
    const [calcProbBGivenA, setCalcProbBGivenA] = useState(defaultProbBGivenA);
    const [calcPriorA, setCalcPriorA] = useState(defaultPriorA);
    const [calcPBGivenA_Bayes, setCalcPBGivenA_Bayes] = useState(defaultPBGivenA_Bayes);
    const [calcPBGivenNotA, setCalcPBGivenNotA] = useState(defaultPBGivenNotA);
    
    // results
    const [conditionalResult, setConditionalResult] = useState({ pAandB: null, percentage: 'N/A' });
    const [bayesResult, setBayesResult] = useState({ pAGivenB: null, percentage: 'N/A' });
    
    
    // CONDITIONAL LOGIC
    const calculateConditional = useCallback(() => {
        const pa = parseFloat(calcProbA);
        const pbGivenA = parseFloat(calcProbBGivenA);

        if (isNaN(pa) || isNaN(pbGivenA) || pa < 0 || pa > 1 || pbGivenA < 0 || pbGivenA > 1) {
            setConditionalResult({ pAandB: null, percentage: 'Invalid Input' });
            return;
        }

        const pAandB = pa * pbGivenA;
        const percentage = (pAandB * 100).toFixed(2);
        
        setConditionalResult({ pAandB, percentage });
    }, [calcProbA, calcProbBGivenA]); 

    // BAYES LOGIC
    const calculateBayes = useCallback(() => {
        const pA = parseFloat(calcPriorA);
        const pBGivenA = parseFloat(calcPBGivenA_Bayes);
        const pBGivenNotA_val = parseFloat(calcPBGivenNotA); 
        
        if (isNaN(pA) || isNaN(pBGivenA) || isNaN(pBGivenNotA_val) || pA < 0 || pA > 1 || pBGivenA < 0 || pBGivenA > 1 || pBGivenNotA_val < 0 || pBGivenNotA_val > 1) {
            setBayesResult({ pAGivenB: null, percentage: 'Invalid Input' });
            return;
        }

        const pNotA = 1 - pA;
        const pB = (pBGivenA * pA) + (pBGivenNotA_val * pNotA);
        
        if (pB === 0) {
            setBayesResult({ pAGivenB: null, percentage: 'P(B) is 0' });
            return;
        }

        const pAGivenB = (pBGivenA * pA) / pB;
        const percentage = (pAGivenB * 100).toFixed(2);
        
        setBayesResult({ pAGivenB, percentage });
    }, [calcPriorA, calcPBGivenA_Bayes, calcPBGivenNotA]); 


    useEffect(() => {
        calculateConditional();
        calculateBayes();
        
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }, [calculateConditional, calculateBayes]); 

    // input change handler
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    }
    
    // button handlers
    const handleConditionalCalculate = () => {
        setCalcProbA(inputProbA);
        setCalcProbBGivenA(inputProbBGivenA);
    };

    const handleBayesCalculate = () => {
        setCalcPriorA(inputPriorA);
        setCalcPBGivenA_Bayes(inputPBGivenA_Bayes);
        setCalcPBGivenNotA(inputPBGivenNotA);
    };

    /*  <><><><><><><><><><>  RETURN  <><><><><><><><><><>  */
    return (
        <>
            <Navigation />
            <main className="container">
                {/* Conditional Section */}
                <section className="body-section">
                    <h1>
                        Conditional Probability: <span className="mathjax-formula">
                            {'\\(P(A \\cap B) = P(B|A) \\cdot P(A)\\)'}
                        </span>
                    </h1>
                    <p>Calculate the probability of <b>A and B</b> happening.</p>
                    
                    <div className="input-group">
                        <label htmlFor="prob-a">P(A) - Probability of A (as a decimal, e.g., 0.5):</label>
                        <input
                            type="number"
                            id="prob-a"
                            value={inputProbA}
                            onChange={handleInputChange(setInputProbA)}
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="prob-b-given-a">P(B|A) - Probability of B, given A happened (as a decimal):</label>
                        <input
                            type="number"
                            id="prob-b-given-a"
                            value={inputProbBGivenA}
                            onChange={handleInputChange(setInputProbBGivenA)}
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                    
                    <button
                        className="button"
                        onClick={handleConditionalCalculate} // BUTTON TRIGGER
                    >
                        Calculate P(A ∩ B)
                    </button>
                    
                    <div id="conditional-result" className="feature-box" style={{ marginTop: '20px' }}>
                        <p>
                            The probability of A and B occurring, <b>P(A and B)</b>, is 
                            <b>{conditionalResult.pAandB !== null ? conditionalResult.pAandB.toFixed(4) : conditionalResult.percentage}</b> ({conditionalResult.percentage}%).
                        </p>
                        {conditionalResult.pAandB > 0 && (
                            <span style={{ fontSize: '0.9em' }}>
                                (Your chance of getting both events is 1 in {(1 / conditionalResult.pAandB).toFixed(0)} attempts.)
                            </span>
                        )}
                    </div>

                </section>
                
                <hr />

                {/* Bayes' Theorem Section */}
                <section className="body-section">
                    <h1>
                        Bayes' Theorem: <span className="mathjax-formula">
                            {'\\(P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}\\)'}
                        </span>
                    </h1>
                    <p>Calculate the <b>Posterior Probability</b> (e.g., the chance of having a condition, given a positive test).</p>

                    <div className="input-group">
                        <label htmlFor="prior-a">P(A) - Prior Probability (e.g., Prevalence, as a decimal):</label>
                        <input
                            type="number"
                            id="prior-a"
                            value={inputPriorA}
                            onChange={handleInputChange(setInputPriorA)}
                            min="0"
                            max="1"
                            step="0.001"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="prob-b-given-a-bayes">P(B|A) - True Positive Rate (Sensitivity, as a decimal):</label>
                        <input
                            type="number"
                            id="prob-b-given-a-bayes"
                            value={inputPBGivenA_Bayes}
                            onChange={handleInputChange(setInputPBGivenA_Bayes)}
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="prob-b-given-not-a">P(B|~A) - False Positive Rate (1 - Specificity, as a decimal):</label>
                        <input
                            type="number"
                            id="prob-b-given-not-a"
                            value={inputPBGivenNotA}
                            onChange={handleInputChange(setInputPBGivenNotA)}
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                    
                    <button
                        className="button"
                        onClick={handleBayesCalculate} // BUTTON TRIGGER
                    >
                        Calculate P(A|B) (Posterior Probability)
                    </button>

                    <div id="bayes-result" className="feature-box" style={{ marginTop: '20px' }}>
                        <p>
                            The Posterior Probability <b>P(A given B)</b> is 
                            <b>{bayesResult.pAGivenB !== null ? bayesResult.pAGivenB.toFixed(6) : bayesResult.percentage}</b> ({bayesResult.percentage}%).
                        </p>
                        {bayesResult.pAGivenB !== null && bayesResult.pAGivenB >= 0 && (
                            <span style={{ fontSize: '0.9em' }}>
                                This means if event B occurs (e.g., a positive test), the updated chance of A being true (e.g., having the condition) is {bayesResult.percentage}%.
                            </span>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default AdvancedProbabilities;
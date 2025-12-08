import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <Header /> 
            <main className="container">
                <section className="body-section">
                    <h1>Welcome!</h1> 
                    <p>
                        The purpose of this website is to compute probabilities and reformat them in ways that can better 
                        help users understand complex probabilistic concepts through simulations and visualizations.
                    </p>
                    <p>
                        Try out the different types of calculation and visualization options in the menu above!
                    </p>

                    <div className="feature-box">
                        <h2>Core Features</h2>
                        <p>Navigate the menu to access the following calculators:</p>
                        <ul>
                            <li><b>Basic Probabilities:</b> Input fractions and get insights (percentage, expected value).</li>
                            <li><b>Advanced Probabilities:</b> Calculate Conditional Probability and Bayes' Theorem.</li>
                            <li><b>Combinatorics:</b> Solve problems involving Permutations and Combinations.</li>
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
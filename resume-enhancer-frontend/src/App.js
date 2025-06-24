import React, { useState } from 'react';
import './App.css';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const enhanceText = async () => {
    setLoading(true);
    setError('');
    setEnhancedText('');

    try {
      const response = await fetch('http://localhost:3001/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: resumeText })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to enhance');
      setEnhancedText(data.enhanced);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exampleSuggestions = [
    "Worked on data entry and reporting",
    "Helped manage social media accounts",
    "Assisted in customer support and email responses",
    "Handled sales calls and lead follow-ups",
    "Supported project management and documentation"
  ];

  return (
    <div className="page">
      <nav className="navbar">
        <div className="logo">Smart Resume Enhancer</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      <header className="hero">
        <h1>Enhance Your Resume Instantly with AI 🚀</h1>
        <p>Transform your bullet points into professional, result-oriented statements in seconds.</p>
        <a href="#enhancer" className="cta">Try Now</a>
      </header>

      <section id="enhancer" className="enhancer-section">
        <h2>Paste your resume line below:</h2>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="e.g., Managed team tasks and tracked project updates"
        ></textarea>
        <button onClick={enhanceText} disabled={loading}>
          {loading ? 'Enhancing...' : 'Enhance Now'}
        </button>
        {error && <p className="error">{error}</p>}
        {enhancedText && (
          <div className="result">
            <h3>✨ Enhanced Output:</h3>
            <p>{enhancedText}</p>
          </div>
        )}

        <div className="examples">
          <h4>Example Inputs:</h4>
          <ul>
            {exampleSuggestions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>AI Powered</h3>
            <p>Uses cutting-edge AI to rewrite content professionally.</p>
          </div>
          <div className="feature">
            <h3>Fast & Easy</h3>
            <p>Get results in seconds. Just paste and click.</p>
          </div>
          <div className="feature">
            <h3>Free to Use</h3>
            <p>No login, no charges. Just enhance and copy.</p>
          </div>
        </div>
      </section>

      <section id="how" className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Paste your resume bullet point in the textbox</li>
          <li>Click "Enhance Now"</li>
          <li>Get a professional, improved version instantly</li>
        </ol>
      </section>

      <section id="about" className="about">
        <h2>About This Project</h2>
        <p>
          This project is built using React for the frontend and Flask for the backend.
          It leverages OpenAI's GPT model to rewrite resume content in a more professional tone.
          Designed and developed by <strong>Sriram</strong>.
        </p>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Smart Resume Enhancer by Sriram</p>
      </footer>
    </div>
  );
}

export default App;

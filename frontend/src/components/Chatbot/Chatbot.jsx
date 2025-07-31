import React, { useState } from 'react';
import './Chatbot.css';

function App() {
  const [question, setQuestion] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setSqlQuery('');

    try {
      const response = await fetch('http://localhost:8000/generate-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSqlQuery(data.sqlQuery);
      setResult(data.result);
    } catch (err) {
      setError(err.message || 'Failed to process your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Cricket Fantasy SQL Query Generator</h1>
      </header>
      
      <main className="app-main">
        <form onSubmit={handleSubmit} className="query-form">
          <div className="form-group">
            <label htmlFor="question">Enter your question about cricket fantasy data:</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Show top 5 players by runs"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Generate SQL and Execute'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {sqlQuery && (
          <div className="result-section">
            <h2>Generated MySQL Query</h2>
            <pre className="sql-query">{sqlQuery}</pre>
          </div>
        )}

        {result && (
          <div className="result-section">
            <h2>Query Results</h2>
            {Array.isArray(result) ? (
              result.length > 0 ? (
                <table className="result-table">
                  <thead>
                    <tr>
                      {Object.keys(result[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <td key={i}>{value !== null ? String(value) : 'NULL'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No results found</p>
              )
            ) : (
              <p className="success-message">{result}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
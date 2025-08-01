

import React, { useState } from 'react';

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
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cricket Fantasy SQL Query Generator</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label htmlFor="question" className="block font-semibold mb-2">
              Enter your question about cricket fantasy data:
            </label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Show top 5 players by runs"
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Generate SQL and Execute'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-6">
            {error}
          </div>
        )}

        {sqlQuery && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Generated MySQL Query</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-800 font-mono">
              {sqlQuery}
            </pre>
          </div>
        )}

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Query Results</h2>
            {Array.isArray(result) ? (
              result.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        {Object.keys(result[0]).map((key) => (
                          <th key={key} className="border px-4 py-2 text-left font-medium text-gray-700">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((row, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-50">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="border px-4 py-2 text-gray-800">
                              {value !== null ? String(value) : 'NULL'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No results found</p>
              )
            ) : (
              <p className="bg-green-100 text-green-800 p-4 rounded">{result}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

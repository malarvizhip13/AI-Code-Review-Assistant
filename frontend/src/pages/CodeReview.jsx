import { useState } from "react";
import Navbar from "../Navbar";

function CodeReview() {
  const [code, setCode] = useState("");
  const [issues, setIssues] = useState([]);

  const handleReview = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });

    const data = await response.json();

    setIssues(data.issues);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          New Code Review
        </h1>

        <p className="mt-2 text-gray-600">
          Paste your source code and review it.
        </p>

        <form onSubmit={handleReview} className="mt-8">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-96 p-4 border rounded-lg bg-white font-mono"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Review Code
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Review Results
          </h2>

          {issues.length === 0 ? (
            <p className="text-gray-600">
              No issues found.
            </p>
          ) : (
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow border-l-4 border-red-500"
                >
                  <h3 className="text-red-600 font-bold text-lg">
                    Error
                  </h3>

                  <p className="mt-2">
                    <strong>Rule:</strong> {issue.ruleId}
                  </p>

                  <p className="mt-2 text-gray-700">
                    {issue.message}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Line: {issue.line}
                  </p>

                  <p className="text-sm text-gray-500">
                    Column: {issue.column}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeReview;
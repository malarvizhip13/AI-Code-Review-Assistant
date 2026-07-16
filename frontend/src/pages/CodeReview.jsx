import { useState } from "react";
import Navbar from "../Navbar";

function CodeReview() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

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

    setResult(JSON.stringify(data.issues, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          New Code Review
        </h1>

        <p className="mt-2 text-gray-600">
          Paste your source code and review it using AI.
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

        {result && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg">
            <p className="text-green-700 font-semibold">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}



export default CodeReview;
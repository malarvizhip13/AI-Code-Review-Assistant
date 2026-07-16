import { useState } from "react";
import Navbar from "../Navbar";

function CodeReview() {
  const [code, setCode] = useState("");

  const handleReview = (e) => {
    e.preventDefault();

    console.log(code);
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
      </div>
    </div>
  );
}

export default CodeReview;
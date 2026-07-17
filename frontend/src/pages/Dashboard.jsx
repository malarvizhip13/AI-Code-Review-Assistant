import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Analyze your code and improve its quality with AI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Total Reviews</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Average Score</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Issues Found</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

      
        <button
  onClick={() => navigate("/code-review")}
  className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
>
  New Code Review
</button>

<button
  onClick={() => navigate("/review-history")}
  className="ml-4 mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg"
>
  Review History
</button>
      </div>
    </div>
  );
}

export default Dashboard;
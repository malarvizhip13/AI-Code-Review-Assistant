import { useNavigate } from "react-router-dom";
import { supabase } from "./services/supabase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        AI Code Review Assistant
      </h1>

      <div className="flex gap-6 items-center">
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button>
          Review History
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
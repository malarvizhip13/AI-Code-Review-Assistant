import { useEffect, useState } from "react";

function ReviewHistory() {
  const [reviews, setReviews] = useState([]);
const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Review History
      </h1>
<input
  type="text"
  placeholder="Search reviews..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 mb-6 border rounded-lg"
/>
      {reviews.length === 0 ? (
        <p className="text-gray-600">
          No reviews found
        </p>
        
      ) : (

       reviews
  .filter((review) =>
    review.id.toString().includes(search)
  )
  .map((review) => (
          <div
            key={review.id}
            className="bg-white p-5 rounded-lg shadow mb-4"
          >
            <p>
              Review ID: {review.id}
            </p>

            <p>
              Created At: {review.created_at}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewHistory;
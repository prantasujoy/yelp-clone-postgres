import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../Services/apiservice";

import { RatingComponent, ReviewSlider } from "../components";

const DetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [priceRange, setPriceRange] = useState();

  const [avgRating, setAvgRating] = useState();

  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [user_reviews, setUserReviews] = useState();
  const [reviewer_name, setReviewerName] = useState();

  const fetch_restaurant = async () => {
    try {
      const response = await apiService.get(`/restaurants/${id}`);

      const [{ name, location, price_range }] = response.data.data.restaurants;
      const reviews = response.data.data.reviews;
      const avg_rating = response.data.data.avg_rating;

      setName(name);
      setLocation(location);
      setPriceRange(price_range);
      setUserReviews(reviews);
      setAvgRating(avg_rating);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_restaurant();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post(`/restaurants/${id}/addreview`, {
        restaurant_id: id,
        name: reviewer_name,
        review,
        rating,
      });

      navigate("/");

      setReview("");
      setRating("");
      setAvgRating("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-50 p-5 flex justify-center items-center  bg-slate-800 min-w-full">
        <p className="text-3xl font-medium text-white">Details Page</p>
      </div>

      <div className="max-w-xl mx-auto mt-8 bg-slate-700 p-8 rounded-lg  overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">
          {name} : total {user_reviews?.length} reviews
        </h2>

        {user_reviews?.length > 0 && <ReviewSlider reviews={user_reviews} />}

        <div className="mb-4">
          <label
            className="block text-gray-300 font-bold  text-xl mb-1"
            htmlFor="name"
          >
            Name:
          </label>
          <div className="text-gray-200">{name}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 font-bold text-xl mb-1"
            htmlFor="location"
          >
            Location:
          </label>
          <div className="text-gray-200">{location}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 font-bold  text-xl mb-1"
            htmlFor="priceRange"
          >
            Price Range:
          </label>
          <div className="text-gray-200">{"$".repeat(priceRange)}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 font-bold  text-xl mb-1"
            htmlFor="priceRange"
          >
            Average Rating:
          </label>
          <RatingComponent rating={avgRating} />
        </div>

        {/* rating and review form */}

        <form onSubmit={handleSubmit}>
          <div className=" flex  flex-col   gap-3 ">
            <input
              className="w-full  mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Your Name"
              value={reviewer_name}
              onChange={(e) => setReviewerName(e.target.value)}
            />{" "}
            <select
              className="w-full  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled selected>
                Select Rating
              </option>
              <option value={1}>{"*".repeat(1)}</option>
              <option value={2}>{"*".repeat(2)}</option>
              <option value={3}>{"*".repeat(3)}</option>
              <option value={4}>{"*".repeat(4)}</option>
              <option value={5}>{"*".repeat(5)}</option>
            </select>
            <textarea
              className="w-full mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write a review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded"
              type="submit"
            >
              Send Review
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailsPage;

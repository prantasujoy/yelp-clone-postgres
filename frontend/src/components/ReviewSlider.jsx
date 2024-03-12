import React, { useState } from "react";
import { ReviewCard } from ".";

const ReviewSlider = ({ reviews }) => {
  console.log(reviews);
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviewCards = reviews?.map((review) => (
    <ReviewCard review={review} key={review.id} />
  ));

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? reviewCards.length - 1 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === reviewCards.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <div className="max-w-xl mx-auto relative overflow-hidden">
      <div className="flex">
        {reviewCards.filter((reviewCard, index) => index == currentSlide)}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-grey-500 hover:bg-black bg-opacity-50 text-white px-3 py-2 rounded-md"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-grey-500  hover:bg-black bg-opacity-50 text-white px-3 py-2 rounded-md"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default ReviewSlider;

import React from "react";
import { RatingComponent } from ".";

const ReviewCard = ({ review }) => {
  return (
    <div className="max-w-md  mx-auto min-w-52 bg-slate-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6">
      <div className="md:flex">
        <div className="p-8 min-w-96">
          <div className="uppercase tracking-wide  text-white text-xl font-semibold">
            {review.name}
          </div>
          <p className="mt-2 text-grey-200">{review.review}</p>
          <div className="mt-4 flex items-center">
            <RatingComponent rating={review.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
